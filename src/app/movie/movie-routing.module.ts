import { MovieComponent } from './movie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const movieRoutes: Routes = [
    { path: '', component: MovieComponent },
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
