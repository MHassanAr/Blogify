import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from '../../models/blog.model';
import { Button } from '../button/button';

@Component({
  selector: 'app-blog-modal',
  imports: [Button],
  templateUrl: './blog-modal.html',
  styleUrl: './blog-modal.css',
})
export class BlogModal {
  @Input() blog: Blog | null = null;
  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }

}