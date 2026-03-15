import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePost } from './pages/create-post/create-post';
import { AllBlogs } from './pages/all-blogs/all-blogs';
import { adminGuard } from './guards/admin-guard';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'create-post',
        component: CreatePost,
        canActivate: [adminGuard]
    },
    {
        path: 'edit-post/:id',
        component: CreatePost,
        canActivate: [adminGuard]
    },
    {
        path: 'read-blogs',
        component: AllBlogs,
        canActivate: [authGuard]
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [adminGuard]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        component: Signup
    }
];