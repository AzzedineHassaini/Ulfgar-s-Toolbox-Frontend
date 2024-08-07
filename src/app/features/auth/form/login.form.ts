import {Validators} from "@angular/forms";

export interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}


export const LOGIN_FORM = {
  'email': [ '', [Validators.required, Validators.email] ],
  'password': [ '', [Validators.required] ],
  'rememberMe': [ 'false', []]
}
