using Microsoft.EntityFrameworkCore;

namespace Ceres.Model
{
    public partial class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Product> Product { get; set; }

    }
}