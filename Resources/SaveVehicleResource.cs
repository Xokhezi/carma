using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carma.Resources
{
    public class SaveVehicleResource
    {
        public string Plate { get; set; }
        public string Type { get; set; }
        public int StateOfKm { get; set; }
        public string Owner { get; set; }
        public string Status { get; set; }
        public string AxigonCode { get; set; }
        public string OrlenCode { get; set; }
    }
}