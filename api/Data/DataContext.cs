using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> user { get; set; }
        public DbSet<Product> product { get; set; }
        public DbSet<Sale> sale { get; set; }
        public DbSet<Provider> provider { get; set; }
        public DbSet<Brand> brand { get; set; }
    }
}