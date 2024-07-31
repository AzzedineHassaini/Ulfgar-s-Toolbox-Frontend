import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";
import {IAuth, UserRole} from "../../../features/auth/models/auth";
import {toSignal} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../features/auth/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {Button} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Button,
    Ripple,
    RouterLink,
    MenubarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent{

  callBackLogout = (event: any) => {
    this.handleLogout();
  };

  leftItems: MenuItem[] = [];
  rightItems: MenuItem[] = [];

  currentUser: IAuth | undefined;
  isConnected = toSignal(this.authService.isConnected$)

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.authService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      this.leftItems = this.getLeftMenu(this.currentUser);
      this.rightItems = this.getRightMenu(this.currentUser);
    });
  }

  getLeftMenu(currentUser: IAuth | undefined): MenuItem[] {
    if (currentUser) {
      return this.getConnectedMenu()
    } else {
      return this.getAnonymousMenu()
    }
  }

  getRightMenu(currentUser: IAuth | undefined): MenuItem[] {
    if (currentUser) {
      return [
        {
          label: 'Déconnexion',
          command: this.callBackLogout
          // icon: PrimeIcons.HOME,
        }
      ]
    } else {
      return [
        {
          label: 'Connexion',
          routerLink: '/login',
          // icon: PrimeIcons.HOME,
        },
        {
          label: 'Créer un compte',
          routerLink: '/register',
        }
      ]
    }
  }

  private getAnonymousMenu(): MenuItem[] {
    return [
      {
        label: 'Accueil',
        routerLink: '/home',
        icon: PrimeIcons.HOME,
      },
      {
        label: 'Sorts',
        routerLink: '/spells',
        icon: PrimeIcons.SPARKLES
      }
    ]
  }

  private getConnectedMenu(): MenuItem[] {
    return [
      {
        label: 'Accueil',
        routerLink: '/home',
        icon: 'pi pi-home',
      },
      {
        label: 'Sorts',
        routerLink: '/spells'
      }
    ]
  }

  handleLogout(): void {
    this.authService.logout()
    this.router.navigate(['home'])
  }

  openProfile(){
    this.router.navigate(['profile'])
  }

}
