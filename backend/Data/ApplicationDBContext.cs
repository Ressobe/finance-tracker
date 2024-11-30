using api.Models;
using api.Dtos.Transaction;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace api.Data
{

  public class ApplicationDBContext : IdentityDbContext<User>
  {
    public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<SavingGoal> SavingGoals { get; set; }
    public DbSet<SavingTransaction> SavingTransactions { get; set; }
    public DbSet<Transfer> Transfers { get; set; }
    public DbSet<TotalFlowSummaryDto> TotalFlowSummary { get; set; }

    public new DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.Entity<TotalFlowSummaryDto>().HasNoKey();

      List<IdentityRole> roles = new List<IdentityRole>
      {
        new IdentityRole {
          Name = "Admin",
          NormalizedName = "ADMIN"
        },

        new IdentityRole {
          Name = "User",
          NormalizedName = "USER"
        },
      };
      builder.Entity<IdentityRole>().HasData(roles);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionString = configuration.GetConnectionString("postgresdb");
        optionsBuilder.UseNpgsql(connectionString);
      }
    }
  }

}
