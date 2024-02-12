using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Dtos.Admin
{
    public class CustomerOfficialToReturnDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Gender { get; set; }
        public string Title { get; set; }
        public string OfficialName { get; set; }
        public string Designation { get; set; }
        public string PhoneNo { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
    }
}