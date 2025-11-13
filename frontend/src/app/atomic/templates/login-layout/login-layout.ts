import { Component, Output, EventEmitter } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}
  
@Component({
  selector: 'app-login-layout',
  standalone: false,
  templateUrl: './login-layout.html',
  styleUrl: './login-layout.css'
})
export class LoginLayoutComponent {
  // Propaga las credenciales hacia arriba
  @Output() loginAttempt = new EventEmitter<LoginCredentials>();
  @Output() registerClick = new EventEmitter<void>();

  handleLoginAttempt(credentials: LoginCredentials): void {
    this.loginAttempt.emit(credentials);
  }

  handleRegisterClick(): void {
    this.registerClick.emit();
  }
}