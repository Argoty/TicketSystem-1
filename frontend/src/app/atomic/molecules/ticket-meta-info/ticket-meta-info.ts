import { Component, Input } from '@angular/core';
import { TicketData } from '../../pages/ticket-page/ticket-page';
import { formatDate } from '../../../../utils/date.utils';

type AvatarColor = 'blue' | 'green' | 'indigo' | 'purple' | 'orange' | 'pink' | 'teal';

@Component({
  selector: 'app-ticket-meta-info',
  standalone: false,
  templateUrl: './ticket-meta-info.html',
  styleUrl: './ticket-meta-info.css'
})
export class TicketMetaInfoComponent {
  @Input() assignment!: TicketData['assignment'];
  @Input() createdAt!: string;
  @Input() closedAt!: string;

  getFormattedDate(isoDate: string): string {
    return formatDate(isoDate);
  }
}
