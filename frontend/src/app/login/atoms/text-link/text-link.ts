import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-link.html',
  styleUrl: './text-link.css'
})
export class TextLinkComponent {
  @Input() text: string = '';
  @Input() href: string = '#';
}
