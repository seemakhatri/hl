import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.http.post<any>('http://localhost:3000/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']); // or /dashboard, etc.
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Login failed';
        }
      });
  }
}
