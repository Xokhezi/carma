using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carma.Models
{
    public class Request
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
        public DateTime DateOfRequest { get; set; }
        public int TotalKm { get; set; }
        public string TravelFrom { get; set; }
        public string TravelTo { get; set; }
        public string Status { get; set; }
    }
}