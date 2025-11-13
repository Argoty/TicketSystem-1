import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../../templates/dashboard-layout/dashboard-layout';
import { EmployeeService, EmployeeResponseDTO } from '../../../core/service/employee';
import { StorageService } from '../../../core/service/storage.service'; // ← IMPORTA

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePageComponent implements OnInit {
  userInfo: UserInfo = {
    name: '',
    email: '',
    role: '',
    department: ''
  };

  name = signal('');
  email = signal('');
  department = signal('');
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  isEditing = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  employeeId: number = 0;

  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private storageService = inject(StorageService); // ← INYECTA

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    // ✅ USA StorageService
    const employee = this.storageService.getObject<any>('employeeData');
    if (employee) {
      this.employeeId = employee.id;
      this.userInfo = {
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department
      };
      this.name.set(employee.name);
      this.email.set(employee.email);
      this.department.set(employee.department);
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.isEditing) {
      this.loadUserInfo();
      this.currentPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
    }
  }

  handleSave(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword()) {
      if (this.newPassword() !== this.confirmPassword()) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }
      if (this.newPassword().length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        return;
      }
    }

    this.isLoading = true;

    const updateData: Partial<EmployeeResponseDTO> = {
      name: this.name(),
      email: this.email(),
      department: this.department()
    };

    this.employeeService.updateEmployee(this.employeeId, updateData).subscribe({
      next: (updatedEmployee) => {
        // ✅ USA StorageService
        this.storageService.setObject('employeeData', updatedEmployee);
        
        this.userInfo = {
          name: updatedEmployee.name,
          email: updatedEmployee.email,
          role: updatedEmployee.role,
          department: updatedEmployee.department
        };
        this.successMessage = 'Perfil actualizado exitosamente';
        this.isEditing = false;
        this.isLoading = false;
        this.currentPassword.set('');
        this.newPassword.set('');
        this.confirmPassword.set('');
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Error al actualizar el perfil. Por favor intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  handleLogout(): void {
    // ✅ USA StorageService
    this.storageService.removeItem('authToken');
    this.storageService.removeItem('employeeData');
    this.router.navigate(['/login']);
  }

  goToDashboard(): void {
    // ✅ USA StorageService
    const employee = this.storageService.getObject<any>('employeeData');
    if (employee) {
      const role = employee.role;
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
    } else {
      this.router.navigate(['/login']);
    }
  }
}
