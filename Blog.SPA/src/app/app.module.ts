import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverviewComponent } from './components/overview/overview.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
    declarations: [AppComponent,
      OverviewComponent,
      LoginComponent,
      SignupComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatDividerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      MatTableModule,
      MatToolbarModule,
      TopbarComponent
    ],
    providers: [
      provideClientHydration(),
      provideAnimationsAsync(),
      provideHttpClient(withFetch()),
      UserService,
      provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
