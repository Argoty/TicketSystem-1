import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLayoutComponent, UserInfo } from '../../layout/dashboard-layout/dashboard-layout';
import { ButtonComponent } from '../../atoms/button/button';
import { AssignmentService, AssignmentRespondeDTO } from '../../../core/services/assignment.service';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'app-agent-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardLayoutComponent, ButtonComponent],
  templateUrl: './agent-dashboard-page.html',
  styleUrl: './agent-dashboard-page.css'
})
export class AgentDashboardPageComponent implements OnInit {
  userInfo: UserInfo = { name: '', email: '', role: '', department: '' };
  assignments: AssignmentRespondeDTO[] = [];
  isLoading = true;
  query = '';
  stateOptions: string[] = ['ABIERTO', 'EN_PROCESO', 'RESUELTO', 'CERRADO'];
  selectedStateByTicket: Record<number, string | null> = {};

  private assignmentService = inject(AssignmentService);
  private ticketService = inject(TicketService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadAssignments();
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

  loadAssignments(): void {
    this.isLoading = true;
    const employeeData = localStorage.getItem('employeeData');
    const employee = employeeData ? JSON.parse(employeeData) : null;
    const id = employee?.id;
    if (!id) { this.isLoading = false; return; }
    this.assignmentService.getAssignmentsByEmployee(id, this.query).subscribe({
      next: (list) => { this.assignments = list; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  changeTicketState(ticketId: number): void {
    const newState = this.selectedStateByTicket[ticketId];
    if (!newState) return;
    this.ticketService.updateTicketState(ticketId, newState).subscribe({
      next: () => this.loadAssignments(),
      error: (e) => console.error(e)
    });
  }

  goToTicket(ticketId: number): void {
    this.router.navigate(['/agent/ticket', ticketId]);
  }

  handleLogout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('employeeData');
    this.router.navigate(['/login']);
  }
}
