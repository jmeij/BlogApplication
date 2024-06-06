import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: true,
  imports: [
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  constructor(private userService: UserService) { }

  get currentUserName(): string {
    return this.userService.user.email;
  }

  public logout(): void {
    this.userService.logout();
  }
}
