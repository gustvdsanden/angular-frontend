import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './interceptor/security.interceptor';
import { SignOnComponent } from './sign-in/sign-on/sign-on.component';
import { LandingComponent } from './landing/landing.component';
import { FeedComponent } from './feed/feed.component';
import { CompanyComponent } from './company/company.component';
import { ProfileComponent } from './company/profile/profile.component';
import { EditComponent } from './company/profile/edit/edit.component';
import { EditUserComponent } from './company/profile/edit-user/edit-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [AppComponent, SignInComponent,SignOnComponent, LandingComponent, FeedComponent, CompanyComponent, ProfileComponent, EditComponent, EditUserComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
