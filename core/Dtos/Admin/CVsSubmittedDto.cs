using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using core.Entities.Orders;

namespace core.Dtos.Admin
{
    public class CVsSubmittedDto
    {
        public int ChecklistHRId { get; set; }
        public int ReviewResultId {get; set;}
        [Required]
        public int TaskId { get; set; }
        [Required]
        public EnumTaskType enuMTaskType {get; set;}
        [Required]
        public int TaskOwnerId { get; set; }
        [Required]
        public int AssignedToId { get; set; }
        [Required]
        public int CandidateId { get; set; }
        [Required]
        public int OrderItemId { get; set; }
        public bool NoReviewBySupervisor {get; set;}
        public int Charges {get; set;}
        public CommonDataDto CommonDataDto {get; set;}
    }
}