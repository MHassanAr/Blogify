import { Component } from '@angular/core';
import { BlogCard } from '../../components/blog-card/blog-card';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog';
import { BlogModal } from '../../components/blog-modal/blog-modal';

@Component({
  selector: 'app-all-blogs',
  imports: [BlogCard, BlogModal],
  templateUrl: './all-blogs.html',
  styleUrl: './all-blogs.css',
})
export class AllBlogs {

  blogs: Blog[] = []
  selectedBlog: Blog | null = null;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.fetchBlogs();
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

}