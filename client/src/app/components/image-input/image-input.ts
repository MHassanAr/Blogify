import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-image-input',
  imports: [Button],
  templateUrl: './image-input.html',
  styleUrl: './image-input.css',
})
export class ImageInput {
  @Input() label = '';
  @Input() previewUrl: string | null = null;

  @Output() fileSelected = new EventEmitter<File | null>();

  isPreviewOpen = false;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.fileSelected.emit(file);

    // allow selecting same file again
    input.value = '';
  }

  openPreview() {
    if (!this.previewUrl) return;
    this.isPreviewOpen = true;
  }

  closePreview() {
    this.isPreviewOpen = false;
  }
}