import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  userName = '';
  email = '';
  password = '';
  error = '';
  message = '';

  constructor(private auth: Auth, private router: Router) { }

  submit() {
    this.error = '';
    this.message = '';

    this.auth.signup(this.userName, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err?.error?.detail ?? 'Signup failed';
      },
    });
  }

}