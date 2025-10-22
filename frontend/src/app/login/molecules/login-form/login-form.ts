import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../atoms/input-field/input-field';
import { ButtonLoginComponent } from '../../atoms/button-login/button-login';
import { ButtonRegisterComponent } from '../../atoms/button-register/button-register';
import { TextLinkComponent } from '../../atoms/text-link/text-link';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputFieldComponent,
    ButtonLoginComponent,
    ButtonRegisterComponent,
    TextLinkComponent
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginFormComponent {
  @Output() loginAttempt = new EventEmitter<LoginCredentials>();
  @Output() registerClick = new EventEmitter<void>();

  email = signal('');
  password = signal('');
  showPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update((val) => !val);
  }

  handleLogin(): void {
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
