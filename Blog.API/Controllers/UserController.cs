using BlogApplication.Interfaces;
using BlogApplication.Models;
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
        /// <returns>A response that returns a token.</returns>
        [HttpPost("login", Name = "Login")]
        public async Task<string?> Login(User user)
        {
            var authentication = await fireBaseAuthService.Login(user.Email, user.Password);
            return authentication;
        }

        /// <summary>
        /// SignUp a user.
        /// </summary>
        /// <param name="user">The user credentials.</param>
        /// <returns>A response that returns a token.</returns>
        [HttpPost("sign-up", Name = "SignUp")]
        public async Task<string?> SignUp(SignUpUser user)
        {
            var authentication = await fireBaseAuthService.SignUp(user.Email, user.Password);
            return authentication;
        }

        /// <summary>
        /// Validates a user.
        /// </summary>
        /// <param name="request">The user token.</param>
        /// <returns>A response indicating success or failure.</returns>
        [HttpPost("validate-token", Name = "Validate token")]
        public async Task<IActionResult> ValidateToken(TokenValidationRequest request)
        {
            var isValid = await fireBaseAuthService.ValidateToken(request.Token);
            if (!isValid)
            {
                return Unauthorized();
            }
            return Ok(new { valid = true });
        }
    }
}
