using System;
using System.Collections.Generic;
using System.Linq;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Threading.Tasks;
using MimeKit;

namespace carma.Services
{
    public interface INotificationService
    {
        void SendNotification(string recipientEmail, string subject, string content);
    }
    public class EmailNotificationService : INotificationService
    {
        private readonly IConfiguration _configuration;
        public EmailNotificationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendNotification(string recipientEmail, string subject, string content)
        {
            string senderEmail = _configuration["EmailSettings:SenderEmail"];
            string senderName = _configuration["EmailSettings:SenderName"];
            string smtpServer = _configuration["EmailSettings:SmtpServer"];
            int smtpPort = Convert.ToInt32(_configuration["EmailSettings:SmtpPort"]);
            string username = _configuration["EmailSettings:Username"];
            string password = _configuration["EmailSettings:Password"];

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress("", recipientEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain")
            {
                Text = content
            };

            using (var client = new SmtpClient())
            {
                client.Connect(smtpServer, smtpPort, SecureSocketOptions.Auto);
                client.Authenticate(username, password);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}