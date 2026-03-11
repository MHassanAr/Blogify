import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'http://localhost:8000';
  private blogsSubject = new BehaviorSubject<Blog[]>([]);
  blogs$ = this.blogsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchBlogs();
  }

  private fetchBlogs() {
    this.http.get<Blog[]>(`${this.apiUrl}/posts`).subscribe({
      next: (data) => this.blogsSubject.next(data),
      error: (err) => console.error(err),
    });
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/posts`, blog).pipe(
      tap((newBlog) => {
        const currentBlogs = this.blogsSubject.value;
        this.blogsSubject.next([newBlog, ...currentBlogs]);
      })
    );
  }

  updateBlog(id: string, blog: Partial<Blog>) {
    return this.http.put(`${this.apiUrl}/posts/${id}`, blog).pipe(
      tap(() => {
        const updated = this.blogsSubject.value.map((b) =>
          String(b.id) === String(id) ? ({ ...b, ...blog, id: b.id } as Blog) : b
        );
        this.blogsSubject.next(updated);
      })
    );
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`).pipe(
      tap(() => {
        const updated = this.blogsSubject.value.filter(
          (b) => String(b.id) !== String(id)
        );
        this.blogsSubject.next(updated);
      })
    );
  }
}