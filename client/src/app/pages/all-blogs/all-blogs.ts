import { Component } from '@angular/core';
import { BlogCard } from '../../components/blog-card/blog-card';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog';
import { BlogModal } from '../../components/blog-modal/blog-modal';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Button } from '../../components/button/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-blogs',
  imports: [CommonModule, BlogCard, BlogModal, Button],
  templateUrl: './all-blogs.html',
  styleUrl: './all-blogs.css',
})
export class AllBlogs {

  blogs$!: Observable<Blog[]>;
  selectedBlog: Blog | null = null;

  constructor(
    private blogService: BlogService,
    private router: Router,
    public auth: Auth
  ) { }

  ngOnInit() {
    this.blogs$ = this.blogService.blogs$;
    this.blogService.fetchBlogs();
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