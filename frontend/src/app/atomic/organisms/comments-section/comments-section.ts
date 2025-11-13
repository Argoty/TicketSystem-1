import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentResponseDTO, CommentService } from '../../../core/service/comment.service';


@Component({
  selector: 'app-comments-section',
  standalone: false,
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.css'
})
export class CommentsSectionComponent {
  @Input() ticketId!: number;
  comments: CommentResponseDTO[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.commentService.getCommentsByTicketId(this.ticketId).subscribe({
      next: (comments) => {
        this.comments = comments;
        console.log(comments);
        
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  onAddComment(text: string) {
    this.commentService.createComment({
      ticketId: this.ticketId,
      employeeId: JSON.parse(localStorage.getItem('employeeData') || '{}').id,
      text: text
    }).subscribe({
      next: (newComment) => {
        this.comments.push(newComment);
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }
}

