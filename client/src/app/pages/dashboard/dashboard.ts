import { Component } from '@angular/core';
import { BlogCard } from "../../components/blog-card/blog-card";
import { HeroSection } from "../../components/hero-section/hero-section";
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BlogCard, HeroSection, Button],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  blogs: Blog[] = [];
  selectedBlog: Blog | null = null;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.blogs$.subscribe({
      next: (data) => this.blogs = data,
      error: (err) => console.error(err)
    });
  }

  openBlog(blog: Blog) {
    this.selectedBlog = blog;
  }

  closeModal() {
    this.selectedBlog = null;
  }
}
