import { Component } from '@angular/core';
import { TicketLayoutComponent } from '../../shared/layout/ticket-layout/ticket-layout';
import { TicketResponseDTO, TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-page',
  standalone: true,
  imports: [TicketLayoutComponent],
  templateUrl: './ticket-page.html',
  styleUrl: './ticket-page.css'
})
export class TicketPageComponent {
  ticket?: TicketResponseDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let ticketId = +params['id'];
      if (ticketId) {
        this.loadTicket(ticketId);
      } else {
        //this.router.navigate(['/not-found']);
        console.error('Invalid ticket ID');
      }
    })
  }

  loadTicket(ticketId: number) {
    this.ticketService.getTicket(ticketId).subscribe({
      next: (data) => {
        this.ticket = data;
        console.log(this.ticket);
        
      },
      error: (err) => {
        console.error('Error loading ticket:', err);
      }
    })
  }

}
