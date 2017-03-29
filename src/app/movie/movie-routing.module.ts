import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const movieRoutes: Routes = [
    { path: '', component: MovieSearchComponent },
    { path: 'show/:id',  component: MovieDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(movieRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MovieRoutingModule { }
