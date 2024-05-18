
namespace BlogApplication.Interfaces
{
    public interface IFirebaseAuthService
    {
        Task<string?> Login(string email, string password);
        //Task<string?> SignUp(string email, string password);

        //void SignOut();
    }
}
