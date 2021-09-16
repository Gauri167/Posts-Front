import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PageNotFound } from './pages/page-not-found/page-not-found.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'posts', component: PostsComponent},
    {path: '**', component: PageNotFound},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
