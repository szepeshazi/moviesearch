import { Router } from '@angular/router';
import { Movie } from '../model/movie';
import { Component, Input } from '@angular/core';


@Component({
	selector: 'app-movie-item',
	templateUrl: './movie-item.component.html',
	styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {

	@Input() public entity: Movie;

	constructor(private router: Router) { }

	navigateTo(entity: Movie) {
		this.router.navigate(['/movie', 'show', entity.imdbId]);
	}

	retryImage() {
		this.entity.imageUrl = undefined;
		this.entity.imageRetryCount++;
	}
}
