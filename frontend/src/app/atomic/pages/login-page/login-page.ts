import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/service/auth';
import { StorageService } from '../../../core/service/storage.service'; // ← IMPORTA
import { LoginCredentials } from '../../molecules/login-form/login-form';
import { jwtResponseDTO } from '../../../core/service/auth';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private storageService = inject(StorageService); // ← INYECTA

  handleLoginAttempt(credentials: LoginCredentials): void {
    this.authService.login(credentials).subscribe({
      next: (response: jwtResponseDTO) => {
        console.log('Login exitoso:', response.token);
        
        // ✅ USA StorageService
        this.storageService.setItem('authToken', response.token);
        this.storageService.setObject('employeeData', response.employee);
        
        const role = response.employee.role;
        switch (role) {
          case 'USER':
            this.router.navigate(['/dashboard/user']);
            break;
          case 'AGENT':
            this.router.navigate(['/dashboard/agent']);
            break;
          case 'ADMIN':
            this.router.navigate(['/dashboard/admin']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en login:', error);
        
        if (error.status === 401) {
          alert('Credenciales incorrectas');
        } else if (error.status === 0) {
          alert('No se pudo conectar con el servidor');
        } else {
          alert('Error al iniciar sesión. Intenta nuevamente.');
        }
      }
    });
  }

  handleRegisterClick(): void {
    this.router.navigate(['/register']);
  }
}