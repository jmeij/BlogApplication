
namespace BlogApplication.Interfaces
{
    public interface IFirebaseAuthService
    {
        Task<string?> Login(string email, string password);
    }
}
