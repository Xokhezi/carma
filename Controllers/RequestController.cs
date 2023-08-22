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

    [Route("api/request")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        public CarmaDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public RequestController(CarmaDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }
        [HttpGet]
        public async Task<IEnumerable<RequestResource>> GetRequests()
        {
            var requsts = await context.Requests.Include(v => v.Vehicle).ToListAsync();
            return mapper.Map<IEnumerable<Request>, IEnumerable<RequestResource>>(requsts);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] SaveRequestResource requestResource)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            // Validate start and end dates
            if (requestResource.DateFrom >= requestResource.DateTo)
                return BadRequest("End date must be after start date");

            var vehicle = await context.Vehicles.FindAsync(requestResource.VehicleId);
            if (vehicle == null)
                return NotFound("Vehicle not found");

            // Check if the vehicle is already out for the given time period
            var existingRequests = await context.Requests
      .Where(r =>
          r.VehicleId == requestResource.VehicleId &&
         (r.Status == "Approved" || r.Status == "Out") &&
        (
        (r.DateFrom <= requestResource.DateTo && r.DateTo >= requestResource.DateTo) ||
        (r.DateFrom <= requestResource.DateFrom && r.DateTo >= requestResource.DateFrom)
        ))
      .ToListAsync();


            if (existingRequests.Any())
                return BadRequest("Pro tento čas je vozidlo již rezervováno");

            var request = mapper.Map<SaveRequestResource, Request>(requestResource);
            request.DateOfRequest = DateTime.Now;
            context.Requests.Add(request);
            await context.SaveChangesAsync();
            return Ok(request);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest([FromBody] SaveRequestResource requestResource, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");

            var requestFromDb = context.Requests.Find(id);
            if (requestFromDb == null)
                return NotFound();
            mapper.Map<SaveRequestResource, Request>(requestResource, requestFromDb);
            await context.SaveChangesAsync();
            return Ok(requestFromDb);
        }
    }


}