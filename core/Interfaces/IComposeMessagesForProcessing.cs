using core.Dtos;
using core.Entities.EmailandSMS;
using core.Params;

namespace core.Interfaces
{
     public interface IComposeMessagesForProcessing
    {
         //process        
        Task<EmailMessage> AdviseProcessTransactionUpdatesToCandidateByEmail(DeployMessageParamDto deploy);
        Task<SMSMessage> AdviseProcessTransactionUpdatesToCandidateBySMS(DeployMessageParamDto deploy);
        
        Task<EmailMessage> ComposeAppplicationTaskMessage (int taskId);

    }
}