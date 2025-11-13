import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { TicketData } from '../../pages/ticket-page/ticket-page';

@Component({
  selector: 'app-ticket-layout',
  standalone: false,
  templateUrl: './ticket-layout.html',
  styleUrls: ['./ticket-layout.css'],
})
export class TicketLayoutComponent {
  @Input() ticketObj!: TicketData;

  @Output() assign = new EventEmitter<void>();
  @Output() reassign = new EventEmitter<void>();
  @Output() resolve = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() reopen = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
