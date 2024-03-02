using core.Entities.Process;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Org.BouncyCastle.Math.EC.Rfc7748;

namespace infra.Data.Config
{
    public class DeployConfiguration : IEntityTypeConfiguration<Deployment>
     {
        public void Configure(EntityTypeBuilder<Deployment> builder)
        {
            builder.HasIndex(x => x.CVRefId);
            builder.Property(x => x.TransactionDate).IsRequired();
            builder.HasOne(p => p.CVRef).WithMany().HasForeignKey(p => p.CVRefId).OnDelete(DeleteBehavior.Restrict);
            builder.HasIndex(p => new{p.CVRefId, p.Sequence}).IsUnique(); //.HasFilter("Sequence <> ");
        }
     }
}