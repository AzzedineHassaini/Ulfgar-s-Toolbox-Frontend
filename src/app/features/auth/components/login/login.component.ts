import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {Button} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {LOGIN_FORM} from "../../form/login.form";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    Button,
    PasswordModule,
    InputTextModule,
    MessagesModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  form: FormGroup;
  serverError: string = '';

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.form = this._fb.group(LOGIN_FORM);
  }

  onSubmit() {
    if (this.form.valid) {
      this.serverError = ''; // Réinitialiser le message d'erreur côté serveur
      this._auth.login(this.form.value).subscribe({
        next: (auth) => {
          console.log(this._auth.currentUser);
          this._router.navigate(['home']);
        },
        error: (error: Error) => {
          this.serverError = error.message;
          console.error(error.message);
        },
        complete: () => {
          // Logique à exécuter lors de la complétion (si nécessaire)
        }
      });
    }
  }

  getErrorMessage(): string {
    let errorMessages: string[] = [];

    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');

    if (emailControl?.invalid && (emailControl.dirty || emailControl.touched)) {
      if (emailControl.errors?.['required']) {
        errorMessages.push("L'email est requis.");
      }
      if (emailControl.errors?.['email']) {
        errorMessages.push("L'email n'est pas valide.");
      }
    }

    if (passwordControl?.invalid && (passwordControl.dirty || passwordControl.touched)) {
      if (passwordControl.errors?.['required']) {
        errorMessages.push("Le mot de passe est requis.");
      }
    }

    if (this.serverError) {
      errorMessages.push(this.serverError);
    }

    return errorMessages.join(' ');
  }

}
