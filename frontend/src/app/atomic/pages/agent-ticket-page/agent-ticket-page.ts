import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TicketService, TicketResponseDTO } from '../../../core/services/ticket.service';
import { AssignmentService } from '../../../core/services/assignment.service';
import { EmployeeResponseDTO } from '../../../core/services/employee.service';
import { TicketInfoComponent } from '../../organism/ticket-info/ticket-info';
import { CommentsSectionComponent } from '../../organism/comments-section/comments-section';
import { ButtonComponent } from '../../atoms/button/button';

export interface AgentTicketData {
  ticket: TicketResponseDTO,
  assignment: { id: number, agent: EmployeeResponseDTO, date: string } | null
};

@Component({
  selector: 'app-agent-ticket-page',
  standalone: true,
  imports: [CommonModule, TicketInfoComponent, CommentsSectionComponent, ButtonComponent],
  templateUrl: './agent-ticket-page.html',
  styleUrl: './agent-ticket-page.css'
})
export class AgentTicketPageComponent implements OnInit {
  ticketData!: AgentTicketData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const ticketId = +params['id'];
      if (ticketId) {
        forkJoin({
          ticket: this.ticketService.getTicket(ticketId),
          assignment: this.assignmentService.getAssignmentByTicketId(ticketId)
        }).subscribe({
          next: ({ ticket, assignment }) => {
            this.ticketData = {
              ticket,
              assignment: assignment ? {
                id: assignment.id,
                agent: assignment.employee,
                date: assignment.assignmentDate
              } : null
            };
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/agent']);
  }
}
