using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Entities;

namespace core.Dtos.Admin
{
    public class CustomerTypeNameKnownAsOfficialsToReturnDto
    {
         public int Id { get; set; }
        public string CustmerType { get; set; }
        public string CustomerName { get; set; }
        public string KnownAs { get; set; }
        public ICollection<CustomerOfficial> CustomerOfficials { get; set; }
    }
}