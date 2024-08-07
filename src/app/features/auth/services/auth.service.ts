import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {IAuth} from "../models/auth";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ILoginForm} from "../form/login.form";
import {IRegisterForm} from "../form/register.form";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _cookie: CookieService,
    private readonly _client: HttpClient
  ) {
    this.loadUser()
  }

  private _currentUser$ = new BehaviorSubject<IAuth | undefined>(undefined);

  set currentUser(value: IAuth | undefined) {
    if (value){
      this._cookie.set("user", btoa(JSON.stringify(value)));
    } else {
      this._cookie.delete("user");
    }
    this._currentUser$.next(value);
  }

  get currentUser(): IAuth | undefined {
    return this._currentUser$.value;
  }

  get currentUser$(): Observable<IAuth | undefined> {
    return this._currentUser$.asObservable();
  }

  get isConnected$(): Observable<boolean> {
    return this.currentUser$.pipe(
      map( auth => !!auth )
    )
  }

  get token(): string | null {
    return this.currentUser ? this.currentUser.accessToken : null
  }

  login(form: ILoginForm): Observable<IAuth> {
    if (form.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('email', form.email);
    } else {
      sessionStorage.setItem('email', form.email);
    }
    return this._client.post<IAuth>(`${environment.apiUrl}/auth/login`, form).pipe(
      tap((auth) => {
        this.currentUser = auth;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue s\'est produite';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && typeof error.error.message === 'string') {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Erreur ${error.status}: ${error.statusText}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  register(form: IRegisterForm, role: string, login: boolean = true) : Observable<IAuth>{
    return this._client.post<IAuth>(environment.apiUrl + '/auth/register', form).pipe(
      tap((auth) => {
        if (login) {
          this.currentUser = auth
        }
      }),
      catchError(this.handleError)
    )
  }

  logout(){
    this.currentUser = undefined;
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('email');
    sessionStorage.removeItem('email');
  }

  loadUser(){
    const userCookie = this._cookie.get("user");
    if( userCookie ){
      this.currentUser = JSON.parse( atob(userCookie) )
    }
  }

  getRememberMe(): string | null{
    return localStorage.getItem('rememberMe');
  }

  getEmail(): string | null{
    return localStorage.getItem('email') || sessionStorage.getItem('email');
  }

}
