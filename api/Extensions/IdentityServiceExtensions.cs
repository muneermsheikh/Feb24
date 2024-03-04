using System.Text;
using core.Entities.Identity;
using infra.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices (this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppIdentityDbContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("IdentityConnection"));
            });


            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
            })
                .AddRoles<AppRole>()
                .AddRoleManager<RoleManager<AppRole>>()
                .AddEntityFrameworkStores<AppIdentityDbContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            /* services.AddIdentityCore<AppUser>()
                .AddEntityFrameworkStores<AppIdentityDbContext>()
                .AddSignInManager<SignInManager<AppUser>>()
                //.AddDefaultTokenProviders()
                //.AddRoles<AppRole>()
                ;
           */
           
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters{
                        ValidateIssuerSigningKey= true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                        ValidIssuer = config["Token:Issuer"],
                        ValidateIssuer = true,
                        ValidateAudience = false
                    };
                });
                
            services.AddAuthorization(opt => {
                opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                opt.AddPolicy("RequireDLForwardRole", policy => policy.RequireRole("Admin", "DocumentController-Admin", "HRManager", "HRSupervisor", "HRExecutive"));
                opt.AddPolicy("RequireOrdersCreateRole", policy => policy.RequireRole("Admin", "DocumentController-Admin", "HRManager"));
                opt.AddPolicy("RequireOrdersViewRole", policy => policy.RequireRole("Admin", "DocumentController-Admin", "HRManager", "HRSupervisor"));
                opt.AddPolicy("RequireCashierRole", policy => policy.RequireRole("Admin", "Accountant", "Cashier"));
                opt.AddPolicy("RequireHRExecRole", policy => policy.RequireRole("Admin", "HRExecutive", "HRSupervisor", "HRManager", "HRTrainee"));
                opt.AddPolicy("RequireHRAssessRole", policy => policy.RequireRole("HRAssess", "Admin", "HRManager"));
                opt.AddPolicy("RequireDesignDLAssessRole", policy => policy.RequireRole("HRManager", "HRSupervisor"));
                opt.AddPolicy("RequireProcessingRole", policy => policy.RequireRole("ProcessExec", "ProcessManager", "DocumentController-Processing"));
                opt.AddPolicy("RequireDocControllerAdminRole", policy => policy.RequireRole("Admin" ,"DocumentController-Admin"));
                opt.AddPolicy("RequireEmigrationRole", policy => policy.RequireRole("Admin" ,"DocumentController-Processing", "EmigrationExecutive"));
            });
            
            return services;
        }
    }
}