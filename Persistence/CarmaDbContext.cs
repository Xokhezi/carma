using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using carma.Models;
using Microsoft.EntityFrameworkCore;

namespace carma.Persistence
{
    public class CarmaDbContext : DbContext
    {
        public CarmaDbContext(DbContextOptions<CarmaDbContext> options) : base(options)
        {
        }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
    }
}