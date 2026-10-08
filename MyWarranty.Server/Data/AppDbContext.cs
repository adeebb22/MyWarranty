using Microsoft.EntityFrameworkCore;
using MyWarranty.Server.Models;

namespace MyWarranty.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<MyProduct> Products { get; set; }
    }
}