import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../features/auth/services/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isConnected$.pipe(
    map((isLogged: any) => {
      const userRole = authService.currentUser?.user.role;

      if ((state.url === '/login' || state.url === '/register') && isLogged) {
        router.navigate(['/home']);
        return false;
      }

      return true;
    })
  )
};

