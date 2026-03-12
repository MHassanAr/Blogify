import { Component } from '@angular/core';
import { BlogService } from '../../services/blog';
import { Router, ActivatedRoute } from '@angular/router'; // CHANGE: import ActivatedRoute
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
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.postId = id;

      // Prefill from already-loaded blogs in BehaviorSubject (no backend GET-by-id needed)
      const existing = this.blogService['blogsSubject'].value.find(b => String(b.id) === String(id));
      if (existing) {
        this.title = existing.title;
        this.description = existing.description;
        this.image = existing.imageUrl;
      }
    }
  }

  onImageSelected(file: File | null) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => (this.image = reader.result as string);
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