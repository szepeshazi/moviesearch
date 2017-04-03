import { SearchResult } from './model/search-result';
import { Movie } from './model/movie';
import { MovieDetail } from './model/movie-detail';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MovieService {
	private serviceURL = 'http://www.omdbapi.com/';

	constructor(private http: Http) { }

	getById(imdbId: string): Observable<MovieDetail> {
		const requestParams = '?i=' + encodeURIComponent(imdbId);
		return this.http.get(this.serviceURL + requestParams)
			.map(response => {
				const responseObj = response.json();
				const movieDetail = MovieDetail.createFromServerResponse(responseObj);
				movieDetail.status = 'success';
				return movieDetail;
			})
			.catch(error => {
				const movieDetail = new MovieDetail();
				movieDetail.status = 'error';
				movieDetail.message = error.message;
				return Observable.of(movieDetail);
			});
	}

	search(expression: string, page?: number): Observable<SearchResult> {

		let requestParams = '?s=' + encodeURIComponent(expression + '*');
		if (page !== undefined) {
			requestParams += '&page=' + page;
		}
		return this.http.get(this.serviceURL + requestParams)
			.map(response => {
				const responseObj = response.json();
				const searchResult = new SearchResult();
				searchResult.term = expression;
				searchResult.status = 'success';
				if (responseObj.Response !== 'True') {
					searchResult.totalResults = 0;
					return searchResult;
				}
				searchResult.totalResults = Number(responseObj.totalResults);
				searchResult.movies = responseObj.Search.map(movie => Movie.createFromServerResponse(movie));
				return searchResult;
			})
			.catch(error => {
				const searchResult = new SearchResult();
				searchResult.status = 'error';
				searchResult.message = error.message;
				return Observable.of(searchResult);
			});
	}
}
