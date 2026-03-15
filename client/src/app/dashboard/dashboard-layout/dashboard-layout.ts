import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../models/navbar.model';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  constructor(public auth: Auth, private router: Router) { }

  navItems: NavItem[] = [
    { label: 'Home', link: '/dashboard', visibility: 'auth' },
    { label: 'Read Blogs', link: '/read-blogs', visibility: 'auth' },
    { label: 'Create Post', link: '/create-post', visibility: 'admin' },
    { label: 'Login', link: '/login', visibility: 'public' },
    { label: 'Sign Up', link: '/signup', visibility: 'public' },
  ];

  get visibleNavItems(): NavItem[] {
    if (!this.auth.isLoggedIn()) {
      return this.navItems.filter((i) => i.visibility === 'public');
    }

    if (this.auth.isAdmin()) {
      return this.navItems.filter((i) => i.visibility === 'auth' || i.visibility === 'admin');
    }

    return this.navItems.filter((i) => i.visibility === 'auth');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}