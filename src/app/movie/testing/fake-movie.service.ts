import { SearchResult } from '../model/search-result';
import { Movie } from '../model/movie';
import { MovieDetail } from '../model/movie-detail';
import { Observable } from 'rxjs/Rx';

import { MOVIES } from './mock-movies';
import { MOVIE_DETAIL } from './mock-movie-details';

export class FakeMovieService {

	getById(imdbId: string): Observable<MovieDetail> {
		let movieDetail: MovieDetail;
		switch (imdbId) {
			case 'tt0372784':
				movieDetail = MovieDetail.createFromServerResponse(MOVIE_DETAIL);
				movieDetail.status = 'success';
				break;
			case 'error-id':
				movieDetail = new MovieDetail();
				movieDetail.status = 'error';
				break;
			default:
				movieDetail = new MovieDetail();
				movieDetail.status = 'success';
				break;
		}
		return Observable.of(movieDetail);
	}

	search(expression: string, page?: number): Observable<SearchResult> {

		let delayAmount = 0;

		if (!page) {
			page = 1;
		}
		const start = (page - 1) * SearchResult.pageSize;
		const end = page * SearchResult.pageSize;

		const searchResult = new SearchResult();
		searchResult.term = expression;

		switch (expression) {
			case 'batman':
				searchResult.movies = MOVIES.slice(start, end).map(movie => Movie.createFromServerResponse(movie));
				searchResult.totalResults = MOVIES.length;
				searchResult.status = 'success';
				break;
			case 'love':
			case 'hate': // intentional fall through
				searchResult.movies = MOVIES.slice(start, end).map(movie => Movie.createFromServerResponse(movie));
				searchResult.totalResults = MOVIES.length;
				searchResult.status = 'success';
				delayAmount = 1000;
				break;
			case 'error-expression':
				searchResult.status = 'error';
				break;
			default:
				searchResult.status = 'success';
				break;
		}

		return Observable.of(searchResult).delay(delayAmount);
	}
}
