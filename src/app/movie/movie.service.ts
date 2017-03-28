import { SearchResult } from './model/search-result';
import { Movie } from './model/movie';
import { MovieDetail } from './model/movie-detail';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MovieService {
    private serviceURL = "http://www.omdbapi.com/";

    constructor(private http: Http) { }

    getById(imdbId: string): Observable<MovieDetail> {
        let requestParams = "?i=" + encodeURIComponent(imdbId);
        return this.http.get(this.serviceURL + requestParams)
            .map(response => {
                let responseObj = response.json();
                let movieDetail = MovieDetail.createFromServerResponse(responseObj);
                return movieDetail;
            })
            .catch(error => Observable.throw(error.message));
    }

    search(expression: string, page?: number) : Observable<SearchResult> {

        let requestParams = "?s=" + encodeURIComponent(expression + "*");
        if (page !== undefined) {
            requestParams += "&page=" + page;
        }
        return this.http.get(this.serviceURL + requestParams)
            .map(response => {
                let responseObj = response.json();
                let searchResult = new SearchResult();
                searchResult.term = expression;
                if (responseObj.Response !== "True") {
                    searchResult.totalResults = 0;
                    return searchResult;
                }
                searchResult.totalResults = Number(responseObj.totalResults);
                searchResult.movies = responseObj.Search.map(movie => Movie.createFromServerResponse(movie));
                return searchResult;
            })
            .catch(error => Observable.throw(error.message));
    }
}