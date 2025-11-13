import { Component, signal, Output, EventEmitter } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginFormComponent {
  // Emite las credenciales, no void
  @Output() loginAttempt = new EventEmitter<LoginCredentials>();
  @Output() registerClick = new EventEmitter<void>();

  email = signal('');
  password = signal('');
  showPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update((val) => !val);
  }

  handleLogin(): void {
    // Emite las credenciales cuando el usuario hace clic
    if (this.email() && this.password()) {
      this.loginAttempt.emit({
        email: this.email(),
        password: this.password()
      });
    }
  }

  handleRegister(): void {
    this.registerClick.emit();
  }
}