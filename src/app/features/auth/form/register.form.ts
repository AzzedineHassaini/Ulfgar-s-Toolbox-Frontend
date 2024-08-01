import {Validators} from "@angular/forms";
import {StrongPasswordRegx} from "../../../shared/const/const";

export interface IRegisterForm {
  email: string,
  password: string,
  pseudo: string
}

export const REGISTER_FORM = {
  'email': [ '', [Validators.required, Validators.email] ],
  'password': [ '', [Validators.required, Validators.pattern(StrongPasswordRegx)] ],
  'pseudo': [ '', [Validators.required] ],
}
