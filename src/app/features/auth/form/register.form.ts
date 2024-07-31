import {Validators} from "@angular/forms";
import {StrongPasswordRegx} from "../../../shared/const";

export interface IRegisterForm {
  mail: string,
  password: string,
  pseudo: string
}

export const REGISTER_FORM = {
  'mail': [ '', [Validators.required, Validators.email] ],
  'password': [ '', [Validators.required, Validators.pattern(StrongPasswordRegx)] ],
  'pseudo': [ '', [Validators.required] ],
}
