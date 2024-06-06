
using FirebaseAdmin.Auth;

namespace BlogApplication.Interfaces
{
    public interface IFirebaseAuthService
    {
        Task<string?> Login(string email, string password);
        Task<string?> SignUp(string email, string password);
        Task<FirebaseToken> ValidateToken(string token);
        void SignOut();
    }
}
