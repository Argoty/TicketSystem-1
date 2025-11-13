import { Component, Input } from '@angular/core';
@Component({
  selector: 'icon-atom',
  templateUrl: './icon.html',
  standalone: false
})
export class IconComponent {
  @Input() name?: string;
  @Input() svg?: string;
  @Input() size: string = 'w-5 h-5';
  @Input() extraClass: string = ''; // clases de color, animación, etc.
}
