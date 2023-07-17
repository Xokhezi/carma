using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using carma.Models;

namespace carma.Resources
{
    public class RequestResource
    {

        public int Id { get; set; }
        public Vehicle Vehicle { get; set; }
        public DateTime DateOfRequest { get; set; }
        public int TotalKm { get; set; }
        public string TravelFrom { get; set; }
        public string TravelTo { get; set; }
    }
}