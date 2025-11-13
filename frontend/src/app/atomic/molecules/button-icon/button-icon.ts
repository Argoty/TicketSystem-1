import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonSize, ButtonColor, ButtonVariant, ButtonRounded } from '../../atoms/button/button.type';
@Component({
  selector: 'icon-button-molecule',
  templateUrl: './button-icon.html',
  standalone: false
})
export class IconButtonMolecule {
  // Propiedades específicas de la molécula
  @Input() iconName?: string;
  @Input() iconSvg?: string;
  @Input() iconPosition: 'left' | 'right' | 'only' = 'left';
  @Input() iconExtraClass: string = '';
  
  // Estado de loading específico de la molécula
  @Input() loading: boolean = false;
  @Input() loadingText?: string;

  // Delegación de propiedades del botón
   @Input() text = '';
   @Input() type: 'button' | 'submit' | 'reset' = 'button';
   @Input() size: ButtonSize = 'md';
   @Input() color: ButtonColor = 'blue';
   @Input() variant: ButtonVariant = 'solid';
   @Input() rounded: ButtonRounded = 'lg';
   @Input() shadow = false;
   @Input() disabled = false;
   @Input() extraClass = '';
  @Output() clickEvent = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.clickEvent.emit(event);
  }

  get buttonText(): string {
    if (this.loading && this.loadingText) {
      return this.loadingText;
    }
    
    if (this.iconPosition === 'only') {
      return '';
    }
    
    return this.text || '';
  }

  get iconSize(): string {
    switch (this.size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5'; // md
    }
  }

  get showIcon(): boolean {
    return !this.loading && (!!this.iconName || !!this.iconSvg);
  }

  get showLoadingSpinner(): boolean {
    return this.loading;
  }

  // Clases adicionales para el botón cuando tiene iconos
  get composedButtonClass(): string {
    let classes = this.extraClass;
    
    // Añadir flexbox para alinear contenido
    classes += ' inline-flex items-center justify-center';
    
    // Ajustar padding cuando es solo icono
    if (this.iconPosition === 'only') {
      switch (this.size) {
        case 'sm':
          classes += ' px-2 py-1.5';
          break;
        case 'lg':
          classes += ' px-3 py-3';
          break;
        default: // md
          classes += ' px-2.5 py-2.5';
          break;
      }
    }
    
    return classes;
  }
}
