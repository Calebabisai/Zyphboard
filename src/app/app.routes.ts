import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
        children: [
        {
            path: 'dashboard',
            loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
        },
        {
            path: 'users',
            loadComponent: () => import('./features/users/users').then(m => m.Users)
        },
        {
            path: 'analytics',
            loadComponent: () => import('./features/analytics/analytics').then(m => m.Analytics)
        },
        {
            path: 'settings',
            loadComponent: () => import('./features/settings/settings').then(m => m.Settings)
        }
        ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: [{
            path: 'login',
            loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
        }]
    }
];
