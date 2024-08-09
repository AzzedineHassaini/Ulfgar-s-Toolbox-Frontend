import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../features/auth/services/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isConnected$.pipe(
    map((isLogged: any) => {
      const userRole = authService.currentUser?.user.role;

      if (!isLogged) return false;

      if (state.url === '/admin' && userRole !== 'ADMIN') {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  )
};

