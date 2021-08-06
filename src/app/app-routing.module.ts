import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOnComponent } from './sign-in/sign-on/sign-on.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, { path: 'sign-in', component: SignInComponent }, { path: 'sign-on', component: SignOnComponent }, { path: 'feed', component: FeedComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
