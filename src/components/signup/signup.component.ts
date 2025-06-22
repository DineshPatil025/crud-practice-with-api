import { Component, Inject, inject, NgZone, signal } from '@angular/core';
import { share } from 'rxjs';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../validators/passwordMatchValidator';
import { CapitalizeFirstDirective } from '../../directives/capitalize-first.directive';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES, CommonModule, CapitalizeFirstDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

   private ngZone = inject(NgZone);

  isSignup: boolean = true;
  signUpForm!: FormGroup;
  emailAlreadyExistsError = signal('');

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _snackbar: SnackbarService
  ) {
    this.isSignup = data?.isSignup || true;

    this.createSignupForm();
  }
  ngOnInit(): void {

  }

  createSignupForm() {
    this.signUpForm = this._fb.group(
      {
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: passwordMatchValidator
      });
  }





  onSignUp() {

    console.log('Form errors:', this.signUpForm.errors?.['passwordMismatch']);

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched(); 
      return;
    }
    this.emailAlreadyExistsError.set('');

    const signUpPayload = {
      firstName: this.signUpForm.value.firstName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    }

    this._authService.signup(signUpPayload).subscribe({
      next: (response) => {
        if (!response.success) {
          this._snackbar.show(response.message, 'warn', 'Close');
        }
        this._snackbar.show(response.message, 'success', 'Close',3000);
        this.dialogRef.close();
      },
      error: (error) => {
        const errorMessage = error.error.errors.email;
        if( errorMessage.includes('already exists')) {
            this.emailAlreadyExistsError.set(errorMessage);
          this._snackbar.show('Signup failed: ' + errorMessage, 'warn', 'Close');
        }
      }
  })
}

  onClose() {
    this.dialogRef.close();
  }

  // Getters for form controls
  get firstName() { return this.signUpForm.get('firstName')!; }
  get email() { return this.signUpForm.get('email')!; }
  get password() { return this.signUpForm.get('password')!; }
  get confirmPassword() { return this.signUpForm.get('confirmPassword')!; }


}
