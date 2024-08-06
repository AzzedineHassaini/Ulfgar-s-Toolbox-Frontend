import { Routes } from '@angular/router';
import {HomeComponent} from "./core/layout/home/home.component";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {SpellListComponent} from "./features/spells/components/spell-list/spell-list.component";
import {SpellDetailComponent} from "./features/spells/components/spell-detail/spell-detail.component";

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
    component: SpellListComponent
  },
  {
    path: 'spells/:id',
    component: SpellDetailComponent
  }
];
