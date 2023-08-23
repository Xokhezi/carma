using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using carma.Models;
using carma.Persistence;
using carma.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carma.Controllers
{
    [Route("api/favourites")]
    [ApiController]
    public class FavouriteController : ControllerBase
    {
        public CarmaDbContext context { get; }
        private readonly IMapper mapper;
        public FavouriteController(CarmaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }
        [HttpGet]
        public async Task<IEnumerable<Favourite>> GetFavourites(string? email)
        {
            var globalFavourites = await context.Favourites.Where(f => f.UserEmail == "Global").ToListAsync();
            var userFavourites = new List<Favourite>();
            if (email != null || email != "")
            {
                userFavourites = await context.Favourites.Where(f => f.UserEmail == email).ToListAsync();
                globalFavourites.AddRange(userFavourites);
            }
            return globalFavourites;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFavourite(int id)
        {
            var favourite = await context.Favourites.FindAsync(id);
            if (favourite == null)
                return NotFound();
            return Ok(favourite);
        }
        [HttpPost]
        public async Task<IActionResult> CrateFavourite([FromBody] Favourite favourite)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var existingFavourite = await context.Favourites.FirstOrDefaultAsync(f => f.Name == favourite.Name);
            if (existingFavourite != null)
                return BadRequest("Favourite already exists");
            context.Favourites.Add(favourite);
            await context.SaveChangesAsync();
            return Ok(favourite);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourite(int id)
        {
            var favourite = await context.Favourites.FindAsync(id);
            if (favourite == null)
                return NotFound();
            context.Remove(favourite);
            await context.SaveChangesAsync();
            return Ok(id);
        }
    }
}