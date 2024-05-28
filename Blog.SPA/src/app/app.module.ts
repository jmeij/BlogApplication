import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminComponent } from './components/admin/admin.component';
import { OverviewComponent } from './components/overview/overview.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
    declarations: [AppComponent,
      AdminComponent,
      OverviewComponent,
      LoginComponent,
      TopbarComponent,
      SignupComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatDividerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      MatToolbarModule
    ],
    providers: [
      provideClientHydration(),
      provideAnimationsAsync(),
      provideHttpClient(withFetch()),
      UserService,
      provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
