import { SearchResult } from '../model/search-result';
import { Movie } from '../model/movie';
import { MovieDetail } from '../model/movie-detail';
import { Observable } from 'rxjs/Rx';

export class FakeMovieService {

    movies: Movie[] = [
        { title: "Batman begins", year: "2005", imdbId: "tt0372784", type: "movie", poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg", imageUrl: undefined, imageRetryCount: 0 },
        { title: "Batman continues", year: "2007", imdbId: "tt0372785", type: "movie", poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg", imageUrl: undefined, imageRetryCount: 0 },
        { title: "Batman ends", year: "2010-", imdbId: "tt0372786", type: "series", poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg", imageUrl: undefined, imageRetryCount: 0 }
    ];

    movieDetail: MovieDetail = {
        title: "Batman begins",
        year: "2005",
        imdbId: "tt0372784",
        type: "movie",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
        imageUrl: undefined,
        imageRetryCount: 0,
        actors: ['Jackie Chan'],
        awards: "No awards",
        countries: ["Hungary"],
        director: "Kim Basinger",
        writer: "Alan Rickman",
        genre: ["Action", "Comedy"],
        imdbRating: "7.8",
        imdbVotes: "50,000",
        languages: ["English"],
        metascore: 50,
        plot: "Very exciting",
        rated: "R",
        released: "2005",
        runtime: 120

    };

    constructor() { }

    getById(imdbId: string): Observable<MovieDetail> {
        return Observable.of(this.movieDetail);
    }

    search(expression: string, page?: number): Observable<SearchResult> {
        let searchResult = new SearchResult();
        searchResult.term = expression;
        if (expression.toLocaleLowerCase() === "batman") {
            searchResult.movies = this.movies;
            searchResult.totalResults = 3;
        } else {
            searchResult.movies = [] as Movie[];
            searchResult.totalResults = 0;
        }
        return Observable.of(searchResult);
    }
}