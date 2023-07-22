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
            var request = mapper.Map<SaveRequestResource, Request>(requestResource);
            request.DateOfRequest = DateTime.Now;
            context.Requests.Add(request);
            await context.SaveChangesAsync();
            return Ok(request);
        }
    }
}