using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using carma.Persistence;
using carma.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carma.Controllers
{
    [Route("api/validation")]
    public class UsersValidationController : Controller
    {
        public CarmaDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public UsersValidationController(CarmaDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }

        [HttpPost]
        public async Task<bool> ValidateUserAsync([FromBody] Validation user)
        {

            var validatedUser = await context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
            if (validatedUser == null)
                return false;
            else
                return true;
        }
        [HttpPost("admin")]
        public async Task<bool> ValidateAdminAsynch([FromBody] Validation user)
        {

            var validatedUser = await context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
            if (validatedUser == null)
                return false;
            else if (validatedUser.IsAdmin)
                return true;
            else
                return false;
        }

    }
}