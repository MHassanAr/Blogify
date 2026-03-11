import { Component } from '@angular/core';
import { BlogCard } from '../../components/blog-card/blog-card';
import { HeroSection } from '../../components/hero-section/hero-section';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BlogCard, HeroSection, Button],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  blogs: Blog[] = [];
  selectedBlog: Blog | null = null;

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.blogs$.subscribe({
      next: (data) => (this.blogs = data),
      error: (err) => console.error(err),
    });
  }

  openBlog(blog: Blog) {
    this.selectedBlog = blog;
  }

  closeModal() {
    this.selectedBlog = null;
  }

  editBlog(blog: Blog) {
    this.router.navigate(['/edit-post', blog.id]);
  }

  deleteBlog(id: string) {
    // instant UI update
    this.blogs = this.blogs.filter((b) => String(b.id) !== String(id));
    // close modal if it was the deleted one
    if (this.selectedBlog && String(this.selectedBlog.id) === String(id)) {
      this.selectedBlog = null;
    }

    this.blogService.deleteBlog(id).subscribe({
      next: () => console.log('Deleted blog', id),
      error: (err) => {
        console.error(err);
      },
    });
  }
}