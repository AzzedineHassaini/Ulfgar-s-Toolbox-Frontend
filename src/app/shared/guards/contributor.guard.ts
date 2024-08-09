import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../features/auth/services/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const contributorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isConnected$.pipe(
    map((isLogged: any) => {
      const userRole = authService.currentUser?.user.role;

      if (!isLogged) return false;

      if ((state.url.startsWith('spells/edit') || state.url.startsWith('spells/add')) && (userRole !== 'ADMIN' && userRole !== 'CONTRIBUTOR')) {
        router.navigate(['/home']);
        return false;
      }

      return true;
    })
  )
};

