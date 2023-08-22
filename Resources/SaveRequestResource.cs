using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carma.Resources
{
    public class SaveRequestResource
    {
        public int VehicleId { get; set; }
        public int TotalKm { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string TravelFrom { get; set; }
        public string TravelTo { get; set; }
        public string Status { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }
        public string Description { get; set; }
        public string TypeOfRequest { get; set; }
    }
}