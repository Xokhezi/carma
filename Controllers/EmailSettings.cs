using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carma.Controllers
{
    public class EmailSettings
    {
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}