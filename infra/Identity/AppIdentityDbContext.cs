using core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace infra.Identity
{
     public class AppIdentityDbContext : IdentityDbContext<AppUser, AppRole, string, 
          IdentityUserClaim<string>, AppUserRole, IdentityUserLogin<string>, 
          IdentityRoleClaim<string>, IdentityUserToken<string>>
     {
          public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
          {
          }

          protected override void OnModelCreating(ModelBuilder builder)
          {
               
               builder.Entity<AppUserRole>(userrole => {
                    userrole.HasKey(ur => new {ur.UserId, ur.RoleId});
               });

               builder.Entity<AppUser>()
                    .HasMany(ur => ur.UserRoles)
                    .WithOne(u => u.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
               
               builder.Entity<AppRole>()
                    .HasMany(ur => ur.UserRoles)
                    .WithOne(u => u.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
               
               base.OnModelCreating(builder);
               //services.AddDefaultIdentity<ApplicationUser().AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
               
          }
     }
}