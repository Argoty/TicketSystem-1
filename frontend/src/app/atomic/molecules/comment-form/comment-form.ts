import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: false,
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.css'
})
export class CommentFormComponent {
  public text: string = '';
  @Output() send = new EventEmitter<string>();

  submit() {
    if (!this.text.trim()) return;
    this.send.emit(this.text.trim());
    this.text = '';
  }
}
