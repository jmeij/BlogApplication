import { inject } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

export const AuthGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

var isLoggedIn = userService.isLoggedIn();
console.log(isLoggedIn);
};
