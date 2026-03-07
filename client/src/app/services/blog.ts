import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/posts`);
  }

  addBlog(blog: Blog): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, blog);
  }

}