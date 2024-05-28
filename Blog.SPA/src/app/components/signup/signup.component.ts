import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SignUpUser } from '../../models/signupuser';
import { CustomValidators } from '../../functions/customValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  },
  {
    validators: CustomValidators.MatchingPasswords
  }
);
  hide = true;

  constructor(private userService: UserService, private router: Router) { }

  public Submit() {
    if (this.form.invalid) {
      return;
    }
    const user: SignUpUser = {
      email: this.form?.get('email')?.value ?? '',
      password: this.form?.get('password')?.value ?? '',
      confirmPassword: this.form?.get('confirmPassword')?.value ?? '',
    };
    this.userService.signUp(user).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}
