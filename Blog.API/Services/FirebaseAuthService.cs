﻿using BlogApplication.Interfaces;
using Firebase.Auth;
using FirebaseAdmin.Auth;
using System.IdentityModel.Tokens.Jwt;

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

    public async Task<FirebaseToken?> ValidateToken(string token)
    {
        try
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

            return decodedToken;
        }
        catch
        {
            return null;
        }
    }

    public void SignOut() => this.firebaseAuth.SignOut();
}