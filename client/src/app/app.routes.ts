import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePost } from './pages/create-post/create-post';
import { AllBlogs } from './pages/all-blogs/all-blogs';

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
        component: CreatePost
    },
    {
        path: 'edit-post/:id',
        component: CreatePost
    },
    {
        path: 'read-blogs',
        component: AllBlogs
    }
];
