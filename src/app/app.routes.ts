import { Routes } from '@angular/router';
import {HomeComponent} from "./core/layout/home/home.component";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {SpellListComponent} from "./features/spells/components/spell-list/spell-list.component";
import {SpellDetailComponent} from "./features/spells/components/spell-detail/spell-detail.component";
import {adminGuard} from "./shared/guards/admin.guard";
import {authGuard} from "./shared/guards/auth.guard";
import {SpellEditComponent} from "./features/spells/components/spell-edit/spell-edit.component";
import {SpellAddComponent} from "./features/spells/components/spell-add/spell-add.component";
import {AdminDashboardComponent} from "./features/admin/components/admin-dashboard/admin-dashboard.component";
import {contributorGuard} from "./shared/guards/contributor.guard";

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
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'spells',
    component: SpellListComponent
  },
  {
    path: 'spells/:id',
    component: SpellDetailComponent
  },
  {
    path: 'spells/edit/:id',
    component: SpellEditComponent,
    canActivate: [contributorGuard]
  },
  {
    path: 'spells/add',
    component: SpellAddComponent,
    canActivate: [contributorGuard]
  }
];
