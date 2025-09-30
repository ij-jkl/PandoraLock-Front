import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { RegisterComponent } from './register/register';
import { SigninComponent } from './signin/signin';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', redirectTo: '' }
];
