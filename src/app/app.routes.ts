import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'jobs',
    },
    {
        path: 'jobs',
        pathMatch: 'full',
        loadComponent: () =>
            import('./components/jobs-list/jobs-list.component').then(
                (m) => m.JobsListComponent
            ),
    },
    {
        path: 'jobs/favorites',
        pathMatch: 'full',
        loadComponent: () =>
            import('./components/jobs-list/jobs-list.component').then(
                (m) => m.JobsListComponent
            ),
    },
    {
        path: 'jobs/:id',
        loadComponent: () =>
            import('./components/job-details/job-details.component').then(
                (m) => m.JobDetailsComponent
            ),
    },
];
