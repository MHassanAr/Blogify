import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  imports: [],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;

  @Output() readMore = new EventEmitter<void>();

}
