import { Component } from '@angular/core';
import { BlogService } from '../../services/blog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseInput } from '../../components/base-input/base-input';
import { Textarea } from '../../components/textarea/textarea';
import { ImageInput } from '../../components/image-input/image-input';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule, BaseInput, Textarea, ImageInput, Button],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost {

  title = '';
  image = '';
  description = '';

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  onImageSelected(file: File | null) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  submitPost() {

    const newBlog = {
      title: this.title,
      description: this.description,
      imageUrl: this.image
    };

    this.blogService.addBlog(newBlog).subscribe({
      next: (res) => {
        console.log('Post created:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error creating post:', err);
      }
    });

  }
}