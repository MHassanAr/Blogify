import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  imports: [FormsModule],
  templateUrl: './base-input.html',
  styleUrl: './base-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInput),
      multi: true
    }
  ]
})
export class BaseInput implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() label = '';

  value: any = '';

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

