using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Dtos.finance
{
    public class COADto
    {
        public int Id {get; set;}
        public string Divn { get; set; }
		public string AccountType { get; set; }
		public string AccountName { get; set; }
		public string AccountClass {get; set;}
		public long ClBalance { get; set; }

    }
}