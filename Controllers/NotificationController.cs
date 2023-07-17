using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using carma.Resources;
using carma.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/email")]
[ApiController]
public class NotificationController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost]
    public IActionResult SendEmail([FromBody] EmailContent email)
    {
        _notificationService.SendNotification(email.RecipientEmail, email.Subject, email.Content);
        return Ok();
    }
}