
import { AuthService } from "../../features/auth/services/auth.service";
import {inject} from "@angular/core";
import {HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth$ = inject(AuthService);
  const token = auth$.token;
  if (token) {
    // Clone the request to add the authentication header.
    const newReq = req.clone(
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
    return next(newReq);
  }
  return next(req);
}

