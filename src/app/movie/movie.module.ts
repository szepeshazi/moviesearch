import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieService } from './movie.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdProgressSpinnerModule } from '@angular/material';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';


@NgModule({
	imports: [
		CommonModule,
		InfiniteScrollModule,
		MdInputModule,
		MdProgressSpinnerModule,
		MdCardModule,
		MovieRoutingModule
	],
	declarations: [MovieSearchComponent, MovieItemComponent, MovieDetailComponent],
	providers: [ MovieService ]
})
export class MovieModule { }
