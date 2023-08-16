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
    [Route("api/vehicles")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        public CarmaDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public VehicleController(CarmaDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }
        [HttpGet]
        public async Task<IEnumerable<VehicleResource>> GetVehicles()
        {
            var vehicles = await context.Vehicles.ToListAsync();
            return mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicles);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);
            if (vehicle == null)
                return NotFound();
            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResource);
        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var existingApp = await context.Vehicles.FirstOrDefaultAsync(a => a.Plate == vehicleResource.Plate);
            if (existingApp != null)
                return BadRequest("Plate already exists");
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();
            return Ok(vehicleResource);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var vehicle = await context.Vehicles.FindAsync(id);
            if (vehicle == null)
                return NotFound();
            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            await context.SaveChangesAsync();
            return Ok(vehicleResource);
        }
    }
}