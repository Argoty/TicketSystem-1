import { Component, Input } from '@angular/core';
import { TicketData } from '../../pages/ticket-page/ticket-page'

@Component({
  selector: 'app-ticket-info',
  standalone: false,
  templateUrl: './ticket-info.html',
  styleUrl: './ticket-info.css'
})
export class TicketInfoComponent {
  @Input() ticketObj!: TicketData;
}
