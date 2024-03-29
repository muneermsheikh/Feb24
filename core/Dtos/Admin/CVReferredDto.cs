using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Dtos
{
    public class CVReferredDto
    {
        public bool Checked {get; set;}
        public int CvRefId { get; set; }
        public string CustomerName { get; set; }
        public int OrderId { get; set; }
        public int OrderNo { get; set; }
        public DateTime OrderDate {get; set;}
        public int OrderItemId { get; set; }
        public int SrNo {get; set;}
        public string CategoryName { get; set; }
        public string CategoryRef { get; set; }
        public int CustomerId { get; set; }
        public int CandidateId { get; set; }
        public int ApplicationNo { get; set; }
        public string CandidateName { get; set; }
        public string PPNo {get; set;}
        public string AgentName {get; set;}
        public DateTime ReferredOn { get; set; }
        public int ReferralDecision { get; set; }
        public DateTime SelectedOn { get; set; }
        public ICollection<DeployDto> Deployments { get; set; }
    }

    
}