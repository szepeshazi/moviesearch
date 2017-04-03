import { SearchResult } from '../model/search-result';
import { Movie } from '../model/movie';
import { MovieDetail } from '../model/movie-detail';
import { Observable } from 'rxjs/Rx';

import { MOVIES } from './mock-movies';
import { MOVIE_DETAIL } from './mock-movie-details';

export class FakeMovieService {

	constructor() { }

	getById(imdbId: string): Observable<MovieDetail> {
		return Observable.of(MovieDetail.createFromServerResponse(MOVIE_DETAIL));
	}

	search(expression: string, page?: number): Observable<SearchResult> {
		if (!page) {
			page = 0;
		}
		const start = page * SearchResult.pageSize;
		const end = (page + 1) * SearchResult.pageSize - 1;

		const searchResult = new SearchResult();
		searchResult.term = expression;

		if (expression.toLocaleLowerCase() === 'batman') {
			searchResult.movies = MOVIES.slice(start, end + 1).map(movie => Movie.createFromServerResponse(movie));
			searchResult.totalResults = searchResult.movies.length;
		} else {
			searchResult.movies = [] as Movie[];
			searchResult.totalResults = 0;
		}
		return Observable.of(searchResult);
	}
}
