using BlogApplication.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IFirebaseAuthService fireBaseAuthService;

        public UserController(IFirebaseAuthService fireBaseAuthService)
        {
            this.fireBaseAuthService = fireBaseAuthService;
        }

        /// <summary>
        /// Login a user.
        /// </summary>
        /// <param name="user">The user credentials.</param>
        /// <returns>A response indicating success or failure.</returns>
        [HttpPost("Login", Name = "Login")]
        public async Task<IActionResult> Login(User user)
        {
            await fireBaseAuthService.Login(user.Email, user.Password);
            return Ok();
        }
    }
}
