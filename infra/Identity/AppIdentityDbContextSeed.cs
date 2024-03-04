using System.Text.Json;
using core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace infra.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsyc(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userdata = await File.ReadAllTextAsync("../infra/Identity/IdentitySeedData/AppUserSeedData.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var users = JsonSerializer.Deserialize<List<AppUser>>(userdata);

            var roles = new List<AppRole>
            {
                new() {Name = "Admin"},
                new() {Name = "HRManager"},
                new() {Name = "HRSupervisor"},
                new() {Name = "HRExecutive"},
                new() {Name = "HRTrainee"},
                new() {Name = "Accountant"},
                new() {Name = "DocumentController-Admin"},
                new() {Name = "DocumentController-Processing"},
                new() {Name = "ProcessingManager"},
                new() {Name = "ProcessingSupervisor"},
                new() {Name = "ProcessingExecutive"},
                new() {Name = "TicketingExecutive"},
                new() {Name = "EmigrationExecutive"},
                new() {Name = "Receptionnist"},
                new() {Name = "Employee"},
                new() {Name = "CustomerOfficial"},
                new() {Name = "VendorOfficial"},
                new() {Name = "Accountant"},
                new() {Name = "FinanceManager"},
                new() {Name = "Candidate"}
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            
            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Candidate");
            }

            
            var adminUser = new AppUser{
                DisplayName = "Munir",
                Email = "munir.sheikh@live.com",
                UserName = "munir.sheikh@live.com",
                Created = new DateTime(),
                Gender = "M",
                UserType = "Employee",
                Address = new Address {
                    FirstName  ="Munir",
                    FamilyName = "Sheikh",
                    City = "Mumbai",
                    Pin = "400018"
                },
            };
            
            await userManager.CreateAsync(adminUser, "Pa$$w0rd");
            await userManager.AddToRolesAsync(adminUser, new[] {"Admin", "Employee"});
        }
    }
}