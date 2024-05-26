using System.ComponentModel.DataAnnotations;

namespace BlogApplication.Models
{
    public class TokenValidationRequest
    {
        [Required]
        public required string Token { get; set; }
    }
}
