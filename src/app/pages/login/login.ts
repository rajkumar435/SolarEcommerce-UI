import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
    styleUrls: ['./login.css']

})
export class LoginComponent {

  ngOnInit()
{
  const token = localStorage.getItem('token');

  if(token)
  {
    this.router.navigate(['/products']);
  }
}
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (res: any) => {

          localStorage.setItem('token', res.token);

          this.router.navigate(['/products']);
        },
        error: err => {
          console.log(err);
          alert('Invalid Username or Password');
        }
      });
  }
}