import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.html',
  styleUrl: './image-input.css',
})
export class ImageInput {

  @Input() label = '';

  @Output() fileSelected = new EventEmitter<File | null>();

  previewUrl: string | null = null;

  onFileChange(event: any) {

    const file = event.target.files[0];
    if (!file) return;

    this.fileSelected.emit(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}