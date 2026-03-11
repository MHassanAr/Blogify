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
  @Input() class = '';

  @Output() clickEvent = new EventEmitter<void>();

  handleClick() {
    if (!this.loading && !this.disabled) {
      this.clickEvent.emit();
    }
  }
}