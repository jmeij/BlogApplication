import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private userService: UserService) { }

  public Submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      email: this.form?.get('email')?.value ?? '',
      password: this.form?.get('password')?.value ?? '',
    };
    this.userService.login(user).subscribe(() => {
      this.form.reset();
    });
  }
}
