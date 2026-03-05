import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [FormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true
    }
  ]
})
export class Textarea implements ControlValueAccessor {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() rows = 5;

  value = '';

  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
