namespace core.Dtos
{
    public class CVRefAndDeployDto
    {
          public CVRefAndDeployDto()
          {
          }
          public bool Checked { get; set; }
          public int CVRefId {get; set;}
          public string CustomerName { get; set; }
          public int OrderId { get; set; }
          public int OrderNo { get; set; }
          public DateTime OrderDate { get; set; }
          public int OrderItemId { get; set; }
          public string CategoryName { get; set; }
          public string CategoryRef { get; set; }
          public int CustomerId { get; set; }
          public int CandidateId { get; set; }
          public int ApplicationNo { get; set; }
          public string CandidateName { get; set; }
          public DateTime ReferredOn { get; set; }
          public DateTime SelectedOn { get; set; }
          public int RefStatus { get; set; }
          public int DeploySequence {get; set;}
          public string DeployStageName {get; set;}
          public DateTime TransactionDate {get; set;}
          public int NextSequence { get; set; }
          public DateTime NextStageDate { get; set; }
    }
}