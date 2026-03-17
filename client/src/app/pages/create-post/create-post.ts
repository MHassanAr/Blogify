import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { BlogService } from '../../services/blog';
import { Router, ActivatedRoute } from '@angular/router';
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

  isEditMode = false;
  postId = '';

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.postId = id;

      const existing = this.blogService['blogsSubject'].value.find(
        (b: any) => String(b.id) === String(id)
      );

      if (existing) {
        this.title = existing.title;
        this.description = existing.description;
        this.image = existing.imageUrl;
      }
    }
  }

  onImageSelected(file: File | null) {
    if (!file) {
      this.image = '';
      this.cdr.detectChanges();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Ensure Angular sees this async update immediately
      this.ngZone.run(() => {
        this.image = reader.result as string;
        this.cdr.detectChanges();
      });
    };
    reader.readAsDataURL(file);
  }

  submitPost() {
    const blog = {
      title: this.title,
      description: this.description,
      imageUrl: this.image,
    };

    if (this.isEditMode) {
      this.blogService.updateBlog(this.postId, blog).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.blogService.addBlog(blog as any).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}