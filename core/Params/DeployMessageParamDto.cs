
using core.Entities.Process;

namespace core.Params
{
    public class DeployMessageParamDto
    {
        public Deploy Deploy { get; set; }
        public bool DirectlySendMessage { get; set; }
    }
}