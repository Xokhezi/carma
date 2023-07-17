using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using carma.Models;
using carma.Resources;

namespace carma.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //mapping from domain to API resources
            CreateMap<Vehicle, VehicleResource>();
            CreateMap<Request, RequestResource>();



            //api resource to domain
            CreateMap<SaveRequestResource, Request>();
            CreateMap<VehicleResource, Vehicle>();
        }
    }
}
