import { Component } from '@angular/core';
import { BlogService } from '../../services/blog';
import { Blog } from '../../models/blog.model';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { BlogCard } from '../../components/blog-card/blog-card';
import { HeroSection } from '../../components/hero-section/hero-section';
import { Button } from '../../components/button/button';
import { BlogModal } from '../../components/blog-modal/blog-modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BlogCard, HeroSection, Button, BlogModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  blogs$!: Observable<Blog[]>;
  selectedBlog: Blog | null = null;

  constructor(private blogService: BlogService, private router: Router, public auth: Auth) { }

  ngOnInit() {
    this.blogs$ = this.blogService.blogs$;
    this.blogService.fetchBlogs(10);
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
        if (this.selectedBlog?.id === id) this.selectedBlog = null;
      },
      error: (err) => console.error(err),
    });
  }
}