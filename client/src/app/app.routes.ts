import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePost } from './pages/create-post/create-post';

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
    }
];
