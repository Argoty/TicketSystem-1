import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutComponent, UserInfo } from '../../layout/dashboard-layout/dashboard-layout';
import { ButtonComponent } from '../../atoms/button/button';
import { InputComponent } from '../../atoms/input/input';
import { TicketService, TicketResponseDTO } from '../../../core/services/ticket.service';
import { CategoryService, CategoryResponseDTO, CategoryCreateDTO, CategoryUpdateDTO } from '../../../core/services/category.service';
import { AssignmentService, AssignmentRespondeDTO } from '../../../core/services/assignment.service';
import { EmployeeService, EmployeeResponseDTO } from '../../../core/services/employee.service';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardLayoutComponent, ButtonComponent, InputComponent],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.css'
})
export class AdminDashboardPageComponent implements OnInit {
  userInfo: UserInfo = { name: '', email: '', role: '', department: '' };

  // Stats
  tickets: TicketResponseDTO[] = [];
  isLoadingTickets = true;

  // Categories
  categories: CategoryResponseDTO[] = [];
  isLoadingCategories = false;
  newCategory: CategoryCreateDTO = { name: '', description: '' };
  editCategoryId: number | null = null;
  editCategory: CategoryUpdateDTO = { name: '', description: '' };

  // Employees
  employees: EmployeeResponseDTO[] = [];
  isLoadingEmployees = false;
  newEmployee = { name: '', email: '', password: '', department: '' } as const;
  newEmployeeForm: { name: string; email: string; password: string; department: string } = { ...this.newEmployee };
  editEmployeeId: number | null = null;
  editEmployee: { name: string; email: string; role: string; department: string } = { name: '', email: '', role: 'USER', department: '' };
  roleOptions: string[] = ['USER', 'ADMIN', 'AGENT'];
  // search by email
  searchEmail = '';
  searchedEmployee: EmployeeResponseDTO | null = null;

  // Assignment tools
  agentList: EmployeeResponseDTO[] = [];
  assignTicketId: number | null = null;
  assignAgentId: number | null = null;
  reassignTicketId: number | null = null;
  reassignAgentId: number | null = null;
  selectedAgentByTicket: Record<number, number | null> = {};
  lastAssignment?: AssignmentRespondeDTO;

  // Ticket state tools
  stateOptions: string[] = ['ABIERTO', 'EN_PROCESO', 'RESUELTO', 'CERRADO'];
  selectedStateByTicket: Record<number, string | null> = {};

  private ticketService = inject(TicketService);
  private categoryService = inject(CategoryService);
  private assignmentService = inject(AssignmentService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadTickets();
    this.loadCategories();
    this.loadEmployees();
    this.loadAgents();
  }

  searchEmployeeByEmail(): void {
    const email = this.searchEmail.trim();
    if (!email) { this.searchedEmployee = null; return; }
    this.employeeService.getEmployeeByEmail(email).subscribe({
      next: (emp: EmployeeResponseDTO) => { this.searchedEmployee = emp; },
      error: () => { this.searchedEmployee = null; }
    });
  }

  loadUserInfo(): void {
    const employeeData = localStorage.getItem('employeeData');
    if (employeeData) {
      const employee = JSON.parse(employeeData);
      this.userInfo = {
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department
      };
    }
  }

  // Tickets
  loadTickets(): void {
    this.isLoadingTickets = true;
    this.ticketService.getAllTickets().subscribe({
      next: (data) => { this.tickets = data; this.isLoadingTickets = false; },
      error: () => { this.isLoadingTickets = false; }
    });
  }

  getCountByState(state: string): number {
    return this.tickets.filter(t => t.state === state).length;
  }

  // Categories
  loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.getAllCategories().subscribe({
      next: (data) => { this.categories = data; this.isLoadingCategories = false; },
      error: () => { this.isLoadingCategories = false; }
    });
  }

  createCategory(): void {
    if (!this.newCategory.name.trim()) return;
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: () => { this.newCategory = { name: '', description: '' }; this.loadCategories(); },
      error: (e) => console.error(e)
    });
  }

  startEditCategory(cat: CategoryResponseDTO): void {
    this.editCategoryId = cat.id;
    this.editCategory = { name: cat.name, description: cat.description };
  }

  saveEditCategory(): void {
    if (this.editCategoryId == null) return;
    this.categoryService.updateCategory(this.editCategoryId, this.editCategory).subscribe({
      next: () => { this.editCategoryId = null; this.loadCategories(); },
      error: (e) => console.error(e)
    });
  }

  cancelEditCategory(): void {
    this.editCategoryId = null;
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.loadCategories(),
      error: (e) => console.error(e)
    });
  }

  // Employees
  loadEmployees(): void {
    this.isLoadingEmployees = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (list: EmployeeResponseDTO[]) => { this.employees = list; this.isLoadingEmployees = false; },
      error: (e: unknown) => { console.error(e); this.isLoadingEmployees = false; }
    });
  }

  createEmployee(): void {
    const payload = { ...this.newEmployeeForm };
    if (!payload.name.trim() || !payload.email.trim() || !payload.password.trim() || !payload.department.trim()) return;
    this.employeeService.createEmployee(payload).subscribe({
      next: () => { this.newEmployeeForm = { ...this.newEmployee }; this.loadEmployees(); },
      error: (e) => console.error(e)
    });
  }

  startEditEmployee(emp: EmployeeResponseDTO): void {
    this.editEmployeeId = emp.id;
    this.editEmployee = { name: emp.name, email: emp.email, role: emp.role, department: emp.department };
  }

  saveEditEmployee(): void {
    if (this.editEmployeeId == null) return;
    const { name, email, role, department } = this.editEmployee;
    this.employeeService.updateEmployee(this.editEmployeeId, { name, email, role, department }).subscribe({
      next: () => { this.editEmployeeId = null; this.loadEmployees(); },
      error: (e) => console.error(e)
    });
  }

  cancelEditEmployee(): void {
    this.editEmployeeId = null;
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (e) => console.error(e)
    });
  }

  // Assignments
  loadAgents(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: EmployeeResponseDTO[]) => { this.agentList = employees.filter(e => e.role === 'AGENT'); },
      error: (e: unknown) => console.error(e)
    });
  }

  assignTicket(ticketId?: number): void {
    const tid = ticketId ?? this.assignTicketId;
    const agentId = (tid != null ? this.selectedAgentByTicket[tid] : this.assignAgentId) ?? null;
    if (!tid || !agentId) return;
    this.assignmentService.createAssignmentByTicketId(tid, agentId).subscribe({
      next: (res) => { this.lastAssignment = res; this.assignTicketId = null; this.assignAgentId = null; this.loadTickets(); },
      error: (e) => console.error(e)
    });
  }

  reassignTicket(ticketId?: number): void {
    const tid = ticketId ?? this.reassignTicketId;
    const agentId = (tid != null ? this.selectedAgentByTicket[tid] : this.reassignAgentId) ?? null;
    if (!tid || !agentId) return;
    this.assignmentService.reassignEmployee(tid, agentId).subscribe({
      next: (res) => { this.lastAssignment = res; this.reassignTicketId = null; this.reassignAgentId = null; this.loadTickets(); },
      error: (e) => console.error(e)
    });
  }

  onSelectAgent(ticketId: number, value: string): void {
    const id = Number(value);
    this.selectedAgentByTicket[ticketId] = isNaN(id) || value === '' ? null : id;
  }

  changeTicketState(ticketId: number): void {
    const newState = this.selectedStateByTicket[ticketId];
    if (!newState) return;
    this.ticketService.updateTicketState(ticketId, newState).subscribe({
      next: () => this.loadTickets(),
      error: (e) => console.error(e)
    });
  }

  deleteTicket(ticketId: number): void {
    this.ticketService.deleteTicket(ticketId).subscribe({
      next: () => this.loadTickets(),
      error: (e) => console.error(e)
    });
  }

  toNumber(value: string): number | null {
    const n = Number(value);
    return isNaN(n) ? null : n;
  }

  handleLogout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('employeeData');
    this.router.navigate(['/login']);
  }
}
