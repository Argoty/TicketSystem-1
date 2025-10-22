import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-login.html',
  styleUrl: './button-login.css'
})
export class ButtonLoginComponent {
  @Input() text: string = 'Iniciar sesión';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
