import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { MenuItem } from "primeng/api";
import { IAuth } from "../../../features/auth/models/auth";
import { toSignal } from "@angular/core/rxjs-interop";
import { AuthService } from "../../../features/auth/services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { MenubarModule } from "primeng/menubar";
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    RouterLink,
    MenubarModule,
    MenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  leftItems: MenuItem[] = [];
  rightItems: MenuItem[] = [];
  isMobileView: boolean = false;

  currentUser: IAuth | undefined;
  isConnected = toSignal(this.authService.isConnected$);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.authService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      this.updateMenuItems();
    });
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobileView = window.innerWidth <= 960;
  }

  private updateMenuItems() {
    this.leftItems = this.getLeftMenu();
    this.rightItems = this.getRightMenu();
  }

  private getLeftMenu(): MenuItem[] {
    return [
      {
        label: 'Accueil',
        routerLink: '/home',
        icon: 'pi pi-home',
      },
      {
        label: 'Sorts',
        routerLink: '/spells',
        icon: 'pi pi-sparkles'
      }
    ];
  }

  private getRightMenu(): MenuItem[] {
    if (this.currentUser) {
      return [
        {
          label: this.currentUser.user.pseudo,
          icon: 'pi pi-user',
          command: () => this.openProfile()
        },
        {
          label: 'Déconnexion',
          icon: 'pi pi-power-off',
          command: () => this.handleLogout()
        }
      ];
    } else {
      return [
        {
          label: 'Connexion',
          icon: 'pi pi-sign-in',
          routerLink: '/login'
        },
        {
          label: 'Créer un compte',
          icon: 'pi pi-user-plus',
          routerLink: '/register'
        }
      ];
    }
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  openProfile() {
    this.router.navigate(['profile']);
  }
}
