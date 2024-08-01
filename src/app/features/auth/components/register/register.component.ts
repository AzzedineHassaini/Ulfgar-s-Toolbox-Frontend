import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { Button } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { InputTextModule } from "primeng/inputtext";
import { REGISTER_FORM } from "../../form/register.form";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NgClass, NgIf } from "@angular/common";
import {ErrorComponent} from "../../../../shared/components/error/error.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    Button,
    PasswordModule,
    InputTextModule,
    NgIf,
    NgClass,
    ErrorComponent,
    ErrorComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;
  serverError: string = '';

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.form = this._fb.nonNullable.group({
      ...REGISTER_FORM,
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator() });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { 'passwordMismatch': true }
        : null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.serverError = '';
      const { confirmPassword, ...registerData } = this.form.getRawValue();
      this._auth.register(registerData, 'USER').subscribe({
        next: () => {
          this._router.navigate(['home']);
        },
        error: (error: Error) => {
          this.serverError = error.message;
          console.error('Erreur lors de l\'inscription:', error.message);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  getErrorMessage(): string {
    let errorMessages: string[] = [];

    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    const pseudoControl = this.form.get('pseudo');
    const confirmPasswordControl = this.form.get('confirmPassword');

    if (emailControl?.invalid && (emailControl.dirty || emailControl.touched)) {
      if (emailControl.errors?.['required']) {
        errorMessages.push("L'email est requis.");
      }
      if (emailControl.errors?.['email']) {
        errorMessages.push("L'email n'est pas valide.");
      }
    }

    if (pseudoControl?.invalid && (pseudoControl.dirty || pseudoControl.touched)) {
      if (pseudoControl.errors?.['required']) {
        errorMessages.push("Le pseudo est requis.");
      }
    }

    if (passwordControl?.invalid && (passwordControl.dirty || passwordControl.touched)) {
      if (passwordControl.errors?.['required']) {
        errorMessages.push("Le mot de passe est requis.");
      }
      if (passwordControl.errors?.['pattern']) {
        errorMessages.push("Le mot de passe doit comporter : 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.");
      }
    }

    if (confirmPasswordControl?.invalid && (confirmPasswordControl.dirty || confirmPasswordControl.touched)) {
      if (confirmPasswordControl.errors?.['required']) {
        errorMessages.push("La confirmation du mot de passe est requise.");
      }
    }

    if (this.form.hasError('passwordMismatch') &&
      confirmPasswordControl?.dirty && passwordControl?.dirty) {
      errorMessages.push("Les mots de passe ne correspondent pas.");
    }

    if (this.serverError) {
      errorMessages.push(this.serverError);
    }

    return errorMessages.join('. ');
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
