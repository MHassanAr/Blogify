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

  fetchBlogs(limit?: number) {
    const url = limit ? `${this.apiUrl}/posts?limit=${limit}` : `${this.apiUrl}/posts`;
    this.http.get<Blog[]>(url).subscribe({
      next: (data) => this.blogsSubject.next(data),
      error: console.error,
    });
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/posts`, blog).pipe(
      tap((newBlog) => {
        const updated = [newBlog, ...this.blogsSubject.value];
        this.blogsSubject.next(updated);
      })
    );
  }

  updateBlog(id: string, blog: Partial<Blog>): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/posts/${id}`, blog).pipe(
      tap((updatedBlog) => {
        const updated = this.blogsSubject.value.map((b) =>
          b.id === id ? updatedBlog : b
        );
        this.blogsSubject.next(updated);
      })
    );
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`).pipe(
      tap(() => {
        const updated = this.blogsSubject.value.filter((b) => b.id !== id);
        this.blogsSubject.next(updated);
      })
    );
  }
}