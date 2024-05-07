using BlogApplication.Interfaces;
using Firebase.Auth.Providers;
using Firebase.Auth;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplication.Controllers
{
    public class UserController : Controller
    {
        [HttpPost(Name = "SignUp")]
        public async Task<IActionResult> Post()
        {
            return Ok();
        }
    }
}
