using core.Dtos;
using core.Dtos.Admin;

namespace core.Specifications
{
     public class TaskDtoForCountSpecs: BaseSpecification<ApplicationTaskDto>
    {
        public TaskDtoForCountSpecs(string taskStatus) : base (x => x.TaskStatus.ToLower() == taskStatus)
        {
        }

        public TaskDtoForCountSpecs(int taskownerid, bool includeTaskItems) : 
            base (x => x.TaskStatus.ToLower() != "completed" && x.TaskStatus.ToLower() != "canceled" )
        {
        }


    }
}