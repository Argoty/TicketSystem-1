import { Component, Input } from '@angular/core';
import { formatDate } from '../../../../utils/date.utils';

@Component({
  selector: 'app-comment-item',
  standalone: false,
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css'
})
export class CommentItemComponent {
  @Input() author!: string;
  @Input() role!: string;
  @Input() date!: string;
  @Input() text!: string;
  @Input() color!: string;

  get formattedDate(): string {
    return formatDate(this.date);
  }
}
