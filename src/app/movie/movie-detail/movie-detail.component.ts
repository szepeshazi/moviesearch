import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../movie.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';


@Component({
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

	public movieDetail: MovieDetail;

	constructor(private movieService: MovieService, private currentRoute: ActivatedRoute) { }

	ngOnInit() {
		this.currentRoute.url.subscribe(
			currentUrl => {
				const imdbId = currentUrl[currentUrl.length - 1].path;
				if (imdbId) {
					this.movieService.getById(imdbId).subscribe(movieDetail => this.movieDetail = movieDetail);
				}
			});
	}
}
