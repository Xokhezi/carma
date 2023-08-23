using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carma.Models
{
    public class Favourite
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int Distance { get; set; }
        public string UserEmail { get; set; }
    }
}