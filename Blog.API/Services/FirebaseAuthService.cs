using BlogApplication.Interfaces;
using Firebase.Auth;

public class FirebaseAuthService : IFirebaseAuthService
{
    private readonly FirebaseAuthClient firebaseAuth;
    public FirebaseAuthService(FirebaseAuthClient firebaseAuth)
    {
        this.firebaseAuth = firebaseAuth;
    }
    public async Task<string?> SignUp(string email, string password)
    {
        var userCredentials = await this.firebaseAuth.CreateUserWithEmailAndPasswordAsync(email, password);
        return userCredentials is null ? null : await userCredentials.User.GetIdTokenAsync();
    }
    public async Task<string?> Login(string email, string password)
    {
        var userCredentials = await this.firebaseAuth.SignInWithEmailAndPasswordAsync(email, password);
        return userCredentials is null ? null : await userCredentials.User.GetIdTokenAsync();
    }

    public void SignOut() => this.firebaseAuth.SignOut();
}