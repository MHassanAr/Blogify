import { Component } from '@angular/core';
import { BlogCard } from "../../components/blog-card/blog-card";
import { HeroSection } from "../../components/hero-section/hero-section";
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog';

@Component({
  selector: 'app-dashboard',
  imports: [BlogCard, HeroSection],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
