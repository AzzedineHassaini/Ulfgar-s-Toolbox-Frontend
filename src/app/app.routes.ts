import { Routes } from '@angular/router';
import {HomeComponent} from "./core/layout/home/home.component";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {SpellComponent} from "./features/spells/components/spell/spell.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'spells',
    component: SpellComponent
  }
];
