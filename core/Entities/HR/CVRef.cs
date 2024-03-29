using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using core.Entities.MasterEntities;
using core.Entities.Orders;
using core.Entities.Process;
using core.Entities.Users;

namespace core.Entities.HR
{
    public class CVRef: BaseEntity
    {
        public CVRef()
        {
        }

          public CVRef(int orderItemId, int candidateid,  int categoryId, int orderId, int orderNo, string customerName, 
                string categoryName, int candidateId, string ecnr, int applicationNo, string candidateName, DateTime referredOn, 
                DateTime refstatusdate, int charges, int hrexecId, int cvreviewId)
          {
               OrderItemId = orderItemId;
               CandidateId = candidateid;
               CategoryId = categoryId;
               OrderId = orderId;
               OrderNo = orderNo;
               CustomerName = customerName;
               CategoryName = categoryName;
               CandidateId = candidateId;
               Ecnr = ecnr;
               ApplicationNo = applicationNo;
               CandidateName = candidateName;
               ReferredOn = referredOn;
               RefStatusDate  =refstatusdate;
               Charges = charges;
               HRExecId = hrexecId;
               CVReviewId = cvreviewId;
          }

        public int CVReviewId { get; set; }
        public int OrderItemId { get; set; }
        public int HRExecId { get; set; }
        public int CategoryId {get; set;}
        public int OrderId {get; set;}
        public int OrderNo {get; set;}
        public string CustomerName {get; set;}
        public string CategoryName {get; set;}
        public int CandidateId { get; set; }
        public string Ecnr { get; set; }
        public int ApplicationNo {get; set;}
        public string CandidateName {get; set;}
        public DateTime ReferredOn { get; set; } = DateTime.Now;
        public int Sequence { get; set; }
        public int NextSequence {get; set;}
        public DateTime? DeployStageDate {get; set;}
        public int Charges {get; set;}
        public string PaymentIntentId {get; set;}
        public int RefStatus { get; set; }=(int)EnumCVRefStatus.Referred;
        public DateTime RefStatusDate {get; set;}
        public DeployStage DeployStage {get; set;}
        public Candidate Candidate {get; set;}
        [ForeignKey("CandidateId")]
        public ICollection<Candidate> Candidates {get; set;}
        [ForeignKey("OrderItemId")]
        public ICollection<OrderItem> OrderItems { get; set; }
        public List<Deployment> Deployments {get; set;}

        //public virtual SelectionDecision SelectionDecision {get; set;}
        
    }
}