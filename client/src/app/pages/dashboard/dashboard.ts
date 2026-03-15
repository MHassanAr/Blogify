import { Component } from '@angular/core';
import { BlogCard } from '../../components/blog-card/blog-card';
import { HeroSection } from '../../components/hero-section/hero-section';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';
import { Router } from '@angular/router';
import { BlogModal } from '../../components/blog-modal/blog-modal';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BlogCard, HeroSection, Button, BlogModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  blogs: Blog[] = [];
  selectedBlog: Blog | null = null;

  constructor(private blogService: BlogService, private router: Router, public auth: Auth) { }

  ngOnInit() {
    this.blogService.fetchLimitedBlogs(10);
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
    this.blogService.deleteBlog(id).subscribe({
      next: () => {
        this.blogs = this.blogs.filter((b) => b.id !== id);
        if (this.selectedBlog?.id === id) this.selectedBlog = null;
      },
      error: (err) => console.error(err),
    });
  }
}