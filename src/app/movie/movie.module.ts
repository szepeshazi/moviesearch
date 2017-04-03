import { SharedModule } from '../shared/shared.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieService } from './movie.service';
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdProgressSpinnerModule, MdSnackBarModule } from '@angular/material';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';


@NgModule({
	imports: [
		SharedModule,
		InfiniteScrollModule,
		MdInputModule,
		MdProgressSpinnerModule,
		MdCardModule,
		MdSnackBarModule,
		MovieRoutingModule
	],
	declarations: [MovieSearchComponent, MovieItemComponent, MovieDetailComponent],
	providers: [ MovieService ]
})
export class MovieModule { }
