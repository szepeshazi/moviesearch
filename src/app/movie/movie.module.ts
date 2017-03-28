import { MovieService } from './movie.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieComponent } from './movie.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {
	MdInputModule,
	MdProgressSpinnerModule,
	MdCardModule
} from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';


@NgModule({
	imports: [
		CommonModule,
		InfiniteScrollModule,
		MdInputModule,
		MdProgressSpinnerModule,
		MdCardModule,
		MovieRoutingModule
	],
	declarations: [MovieComponent, MovieItemComponent, MovieDetailComponent],
	providers: [ MovieService ]
})
export class MovieModule { }
