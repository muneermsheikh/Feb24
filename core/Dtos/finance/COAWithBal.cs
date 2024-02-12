using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Dtos.finance
{
    public class COAWithBal
    {
        public int CoaId {get; set;}
        public string AccountName { get; set; }
		public long ClBalance { get; set; }
    }
}