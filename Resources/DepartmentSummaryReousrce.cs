using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carma.Resources
{
    public class DepartmentSummaryResource
    {
        public int departmentId { get; set; }
        public string order { get; set; }
        public int totalKm { get; set; }
    }
}