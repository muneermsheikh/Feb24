using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Dtos.Admin
{
    public class AssignCandidatesToAddDto
    {
        public int InterviewItemId { get; set; }
        public DateTime ScheduledTimeFrom {get; set;}
        public DateTime ScheduledTimeUpto {get; set;}
        public string InterviewMode {get; set;}
        public List<int> CandidateIds {get; set;}
    }
}