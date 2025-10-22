import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-register.html',
  styleUrl: './button-register.css'
})
export class ButtonRegisterComponent {
  @Input() text: string = 'Registrarse';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
