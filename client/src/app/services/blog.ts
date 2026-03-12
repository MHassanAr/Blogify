import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'http://localhost:8000';
  private blogsSubject = new BehaviorSubject<Blog[]>([]);
  blogs$ = this.blogsSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchBlogs() {
    this.http.get<Blog[]>(`${this.apiUrl}/posts`).subscribe({
      next: (data) => this.blogsSubject.next(data),
      error: console.error,
    });
  }

  fetchLimitedBlogs(limit: number) {
    this.http.get<Blog[]>(`${this.apiUrl}/posts?limit=${limit}`).subscribe({
      next: (data) => this.blogsSubject.next(data),
      error: console.error,
    });
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/posts`, blog).pipe(
      tap((newBlog) => this.blogsSubject.next([newBlog, ...this.blogsSubject.value]))
    );
  }

  updateBlog(id: string, blog: Partial<Blog>): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/posts/${id}`, blog).pipe(
      tap((updatedBlog) => {
        const updated = this.blogsSubject.value.map((b) =>
          String(b.id) === String(id) ? updatedBlog : b
        );
        this.blogsSubject.next(updated);
      })
    );
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`).pipe(
      tap(() => this.blogsSubject.next(this.blogsSubject.value.filter((b) => b.id !== id)))
    );
  }
}