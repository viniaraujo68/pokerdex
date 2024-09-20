import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = { username: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.login(this.user).subscribe(
        (response) => {
          console.log('Logged in:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error logging in:', error);
          this.successMessage = '';
          this.errorMessage = 'Nome de usuário ou senha inválidos';
        }
      );
    } else {
      this.successMessage = '';
      this.errorMessage = 'Preencha os campos corretamente';
    }
  }
}