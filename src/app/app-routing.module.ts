import { MovieComponent } from './movie/movie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
//	{ path: 'movie', loadChildren: 'app/movie/movie.module#MovieModule' },
	{ path: 'movie', component: MovieComponent },
	{ path: '', redirectTo: '/movie', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
