import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private blogs: Blog[] = [];

  getBlogs(): Blog[] {
    return this.blogs;
  }

  addBlog(blog: Blog) {
    this.blogs.push(blog);
  }

}
