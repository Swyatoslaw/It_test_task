import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {RegistrationComponent} from './registration/registration.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegistrationComponent},

  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
