import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/IUser';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  invalidMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/),
      ],
    ],
    admin: [false],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    this.invalidMessages = [];
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      let newUser: User = {
        Firstname: this.signupForm.controls.firstName.value,
        Lastname: this.signupForm.controls.lastName.value,
        Email: this.signupForm.controls.email.value,
        Password: this.signupForm.controls.password.value,
        RoleName: 'test',
      };
      let role = this.signupForm.controls.admin.value;
      if (role === false) {
        this.authService.createUser(newUser).subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        });
      } else {
        this.authService.createAdmin(newUser).subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        });
      }
    } else {
      if (this.signupForm.get('firstName')?.hasError('required'))
        this.invalidMessages.push('First name is required.');
      if (this.signupForm.get('lastName')?.hasError('required'))
        this.invalidMessages.push('Last name is required.');
      if (this.signupForm.get('email')?.invalid) {
        if (this.signupForm.get('email')?.hasError('required'))
          this.invalidMessages.push('Email is required.');
        else if (this.signupForm.get('email')?.hasError('email'))
          this.invalidMessages.push('Please enter a valid email.');
      }
      if (this.signupForm.get('password')?.invalid) {
        if (this.signupForm.get('password')?.hasError('required'))
          this.invalidMessages.push('Password is required.');
        else if (this.signupForm.get('password')?.hasError('minlength'))
          this.invalidMessages.push(
            'Password should be at least 8 characters long.'
          );
        else if (this.signupForm.get('password')?.hasError('pattern'))
          this.invalidMessages.push(
            'Password should contain at least one special character.'
          );
      }
      if (this.signupForm.get('termsAndConditions')?.hasError('requiredTrue'))
        this.invalidMessages.push(
          'You must agree to the terms and conditions.'
        );

      let alertMsg = this.invalidMessages.join('\n');
      alert(alertMsg);
    }
  }
}
