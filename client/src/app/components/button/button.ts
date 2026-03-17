import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() text = '';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() btnClass = '';

  @Output() clickEvent = new EventEmitter<void>();

  handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.loading && !this.disabled) {
      this.clickEvent.emit();
    }
  }
}