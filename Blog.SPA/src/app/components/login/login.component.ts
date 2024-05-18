import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;

  constructor(private userService: UserService, private router: Router) { }

  public Submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      email: this.form?.get('email')?.value ?? '',
      password: this.form?.get('password')?.value ?? '',
    };
    this.userService.login(user).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}
