using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using core.Entities.Identity;
using core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace infra.Services
{
     public class TokenService : ITokenService
     {
          private readonly IConfiguration _config;
          private readonly SymmetricSecurityKey _key;
          private readonly UserManager<AppUser> _userManager;
          public TokenService(IConfiguration config, UserManager<AppUser> userManager)
          {
               _userManager = userManager;
               _config = config;
               _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
          }

          public async Task<string> CreateToken(AppUser user)
          {
               var claims = new List<Claim>
                {
                    /* new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.GivenName, user.DisplayName)
                    */
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                };

               var roles = await _userManager.GetRolesAsync(user);

               claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

               /* if(user.UserRoles != null) {
                    var roles = await _userManager.GetRolesAsync(user);
                    claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
               }
               */

               var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

               var tokenDescriptor = new SecurityTokenDescriptor
               {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(7),
                    SigningCredentials = creds,
                    Issuer = _config["Token:Issuer"]
               };

               var tokenHandler = new JwtSecurityTokenHandler();

               var token = tokenHandler.CreateToken(tokenDescriptor);

               return tokenHandler.WriteToken(token);
          }
     }
}