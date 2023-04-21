import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showAuthError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.controls.email.value,
          this.loginForm.controls.password.value
        )
        .subscribe({
          next: () => {
            console.log('successfully logged in');
            this.router.navigate(['/countries']);
            this.showAuthError = false;
          },
          error: (error) => {
            console.log('error');
            console.log(error);
            this.showAuthError = true;
          },
        });
    }
  }
}
