using api.Errors;
using api.Extensions;
using core.Entities.Admin;
using core.Entities.Identity;
using core.Interfaces;
using core.Params;
using core.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
     [Authorize]
    public class UserHistoryController : BaseApiController
    {
        private readonly IUserHistoryService _userHistoryService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmployeeService _empService;
        public UserHistoryController(IUserHistoryService userHistoryService, UserManager<AppUser> userManager, IEmployeeService empService)
        {
            _empService = empService;
            _userManager = userManager;
            _userHistoryService = userHistoryService;
        }

 
        [HttpGet("historywithitems/{historyid}")]
        public async Task<ActionResult<UserHistoryDto>> GetUserHistoryDataByCandidateId(int historyid)
        {
            
            var data = await _userHistoryService.GetHistoryWithItemsFromHistoryId(historyid);
            if (data == null) return NotFound("No record found with selected id");
            if (data != null) return Ok(data);

            return NotFound(new ApiResponse(400, "Your search parameters did not yield any result"));
        }



        [HttpGet("dto")]
        public async Task<ActionResult<UserHistoryDto>> GetCandidateHistoryFromParams([FromQuery]UserHistoryParams histParams)
        {
            var loggedInUser = await _userManager.FindByEmailFromClaimsPrincipal(User);
            if (loggedInUser == null) return Unauthorized("Access allowed to authorized loggin user only");
            
            var err="";

            var ph = histParams.MobileNo;
            if (!string.IsNullOrEmpty(ph)) {
                if(ph.Substring(0,4) == "0091") ph=ph.Substring(4);
                if(ph.Substring(0,3) == "+91") ph=ph.Substring(3);
                if(ph.Substring(0,1)=="0") ph=ph.Substring(1);
                int l=ph.Length;
                if (l < 10 || l > 15) {
                    ph="";
                    err="mobile no. should be 10 to 15 digits,including country codes";
                }           
                if(string.IsNullOrEmpty(ph)) return BadRequest(new ApiResponse(400, "Invalid mobile no" + err));
            }

            var hist = await _userHistoryService.GetOrAddUserHistoryByParams(histParams, loggedInUser.DisplayName);
            
            if (hist==null) return BadRequest(new ApiResponse(400, "failed to retrieve/create history record"));
            
            return hist;
            
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<Pagination<UserHistoryDto>>> GetPaginatedUserHistory([FromQuery] UserHistoryParams histParams )
        {
            var dto = await _userHistoryService.GetUserHistoryPaginated(histParams);
            if (dto==null) return NotFound(new ApiResponse(404, "No records found"));
            return Ok(dto);
        }
        
        [HttpPost("newusercontact")]
        public async Task<ActionResult<UserHistory>> AddNewUserContact(UserHistory userContact)
        {
            var loggedInUser = await _userManager.FindByEmailFromClaimsPrincipal(User);
            if (loggedInUser == null) return Unauthorized("Access allowed to authorized loggin user only");
            
            //if(userContact.DateOfContact.Year < 2000) userContact.DateOfContact = DateTime.Now;

            var empId = await _empService.GetEmployeeIdFromAppUserIdAsync(loggedInUser.Id);
            if (empId == 0) return Unauthorized("Employee Id not on record");

            //if (userContact.PersonId == 0 ) return BadRequest(new ApiResponse(400, "Either Candidate Id or customer official Id should be provided"));
            
            return await _userHistoryService.AddUserContact(userContact);
        }

        
        [HttpDelete("{userContactId}")]
        public async Task<bool> DeleteUserContactById(int userContactId)
        {
            return await _userHistoryService.DeleteUserContactById(userContactId);
        }


        [HttpDelete("historyItemId/{historyitemid}")]
        public async Task<ActionResult<bool>> DeleteUserHistoryItem(int historyitemid)
        {
            return await _userHistoryService.DeleteUserHistoryItem(historyitemid);
        }
        [HttpGet("contactresults")]
        public async Task<ActionResult<ICollection<ContactResult>>> GetContactResults()
        {
            var results = await _userHistoryService.GetContactResults();
            if (results != null ) return Ok(results);
            return BadRequest(new ApiResponse(404, "No contact result data available"));
        }
        
        [Authorize]
        [HttpPut]
        public async Task<ActionResult<UserHistoryReturnDto>> UpdateContactHistory(UserHistory userhistory)
        {
            var returnDto = new UserHistoryReturnDto();
            /* if (string.IsNullOrEmpty(userhistory.Name) && userhistory.PersonId == 0 ) {
                return BadRequest(new ApiResponse(404, "Person Id and name not provided"));
                
            } else */
            if (userhistory.Id==0) {
                return BadRequest(new ApiResponse(404, "UserHistory Id not available"));
            }

            var dto = await GetLoggedInUserDto();

            returnDto = await _userHistoryService.EditContactHistory(userhistory, dto);
            if (!returnDto.Succeeded) return BadRequest(new ApiResponse(402, "failed to update the contact history"));
            return Ok(returnDto);

        }

        [HttpGet("userItems")]
        public async Task<ActionResult<bool>> UpdateContactHistory(ICollection<UserHistoryItem> userItems)
        {
            var loggedInUser = await _userManager.FindByEmailFromClaimsPrincipal(User);   
            if (loggedInUser == null) return Unauthorized(new ApiResponse(404, "unable to retrieve loggedin User"));
            var succeeded = await _userHistoryService.EditContactHistoryItems(userItems, loggedInUser.loggedInEmployeeId);
            if (succeeded) return Ok(true);
            return BadRequest(new ApiResponse(402, "Failed to Update the transactions items"));
        }

        [HttpPost("userhistoryitem")]
        public async Task<ActionResult<UserHistoryItem>> InsertUserHistoryItem(UserHistoryItem userhistoryitem) {
            
            var loggedInUser = await _userManager.FindByEmailFromClaimsPrincipal(User);
            if (loggedInUser == null) return Unauthorized("Access allowed to authorized loggin user only");
            
            var succeeded = await _userHistoryService.UpdateHistoryItem(userhistoryitem, loggedInUser.DisplayName);
            return succeeded;
        }
        
        [HttpGet("categoryrefdetails")]
        public async Task<ICollection<CategoryRefDto>> GetCategoryRefDetails()
        {
            var dtos = await _userHistoryService.GetCategoryRefDetails();
            return dtos;
        }
        
        private async Task<LoggedInUserDto> GetLoggedInUserDto()
        {
            var loggedInUser = await _userManager.FindByEmailFromClaimsPrincipal(User);
            if (loggedInUser == null) return null;

            var empId = await _empService.GetEmployeeIdFromAppUserIdAsync(loggedInUser.Id);
            var loggedInUserDto = new LoggedInUserDto
            {
                LoggedIAppUsername = loggedInUser.UserName,
                LoggedInAppUserEmail = loggedInUser.Email,
                LoggedInAppUserId = loggedInUser.Id,
                LoggedInEmployeeId = empId,
                HasAdminPrivilege = User.IsInRole("Admin")
            };
            return loggedInUserDto;
        }

    }
}