  import { Component, inject, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { UserInfo } from '../../templates/dashboard-layout/dashboard-layout';
  import { TicketCardData } from '../../molecules/ticket-card/ticket-card';
  import { TicketService, TicketResponseDTO } from '../../../core/service/ticket.service';
  import { StorageService } from '../../../core/service/storage.service';

  @Component({
    selector: 'app-user-dashboard-page',
    standalone: false,
    templateUrl: './user-dashboard-page.html',
    styleUrl: './user-dashboard-page.css'
  })
  export class UserDashboardPageComponent implements OnInit {
    userInfo: UserInfo = {
      name: '',
      email: '',
      role: '',
      department: ''
    };

    tickets: TicketCardData[] = [];
    filteredTickets: TicketCardData[] = [];
    isLoading = true;
    selectedFilter: 'all' | 'open' | 'in_progress' | 'resolved' | 'closed' = 'all';
    showCreateModal = false;

    private ticketService = inject(TicketService);
    private router = inject(Router);
    private storageService = inject(StorageService); // ← Inyecta

    ngOnInit(): void {
      this.loadUserInfo();
      this.loadTickets();
    }

    loadUserInfo(): void {
      // Usa el servicio de storage
      const employee = this.storageService.getObject<any>('employeeData');
      if (employee) {
        this.userInfo = {
          name: employee.name,
          email: employee.email,
          role: employee.role,
          department: employee.department
        };
      }
    }

    loadTickets(): void {
      this.isLoading = true;
      this.ticketService.getAllTickets().subscribe({
        next: (tickets: TicketResponseDTO[]) => {
          this.tickets = tickets.map(ticket => ({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            state: ticket.state,
            category: ticket.category.name,
            creationDate: ticket.creationDate
          }));
          this.filteredTickets = this.tickets;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading tickets:', error);
          this.isLoading = false;
        }
      });
    }

    filterTickets(filter: 'all' | 'open' | 'in_progress' | 'resolved' | 'closed'): void {
      this.selectedFilter = filter;
      
      if (filter === 'all') {
        this.filteredTickets = this.tickets;
      } else {
        const stateMap = {
          'open': 'ABIERTO',
          'in_progress': 'EN_PROCESO',
          'resolved': 'RESUELTO',
          'closed': 'CERRADO'
        };
        this.filteredTickets = this.tickets.filter(ticket => ticket.state === stateMap[filter]);
      }
    }

    getTicketCount(filter: 'all' | 'open' | 'in_progress' | 'resolved' | 'closed'): number {
      if (filter === 'all') {
        return this.tickets.length;
      }
      const stateMap = {
        'open': 'ABIERTO',
        'in_progress': 'EN_PROCESO',
        'resolved': 'RESUELTO',
        'closed': 'CERRADO'
      };
      return this.tickets.filter(ticket => ticket.state === stateMap[filter]).length;
    }

    handleLogout(): void {
      // Usa el servicio de storage
      this.storageService.removeItem('authToken');
      this.storageService.removeItem('employeeData');
      this.router.navigate(['/login']);
    }

    openCreateModal(): void {
      this.showCreateModal = true;
    }

    closeCreateModal(): void {
      this.showCreateModal = false;
    }

    handleTicketCreated(): void {
      this.loadTickets();
      this.closeCreateModal();
    }
  }