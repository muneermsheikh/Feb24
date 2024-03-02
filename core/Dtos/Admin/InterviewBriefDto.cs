using System;
using System.Collections.Generic;

namespace core.Dtos
{
    public class InterviewBriefDto
    {
        public InterviewBriefDto()
        {
        }

        public InterviewBriefDto(string companyName, string interviewVenue, int orderId, int orderNo, DateTime orderDate
            //, ICollection<InterviewItemDto> interviewItemsDto
            )
        {
            CompanyName = companyName;
            InterviewVenue = interviewVenue;
            OrderId = orderId;
            OrderNo = orderNo;
            OrderDate = orderDate;
            //InterviewItemsDto = interviewItemsDto;
        }

        public int Id { get; set; }
        public bool Checked { get; set; }
        public int OrderId {get; set;}
        public int OrderNo {get; set;}
        public DateTime OrderDate {get; set;}
        public int CustomerId { get; set; }
        public string CompanyName { get; set; }
        public string InterviewVenue { get; set; }
        public DateTime InterviewDateFrom {get; set;}
        public DateTime InterviewDateUpto {get; set;}
        public string InterviewStatus { get; set; }
        public string ConcludingRemarks { get; set; }
        //public ICollection<InterviewItemDto> InterviewItemsDto {get; set;}
    }
}