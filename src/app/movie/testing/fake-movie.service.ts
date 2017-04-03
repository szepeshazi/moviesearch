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
		if (!page) {
			page = 0;
		}
		const start = page * SearchResult.pageSize;
		const end = (page + 1) * SearchResult.pageSize - 1;

		const searchResult = new SearchResult();
		searchResult.term = expression;

		switch (expression) {
			case 'batman':
				searchResult.movies = MOVIES.slice(start, end + 1).map(movie => Movie.createFromServerResponse(movie));
				searchResult.totalResults = searchResult.movies.length;
				searchResult.status = 'success';
				break;
			case 'error-expression':
				searchResult.status = 'error';
				break;
			default:
				searchResult.status = 'success';
				break;
		}

		return Observable.of(searchResult);
	}
}
