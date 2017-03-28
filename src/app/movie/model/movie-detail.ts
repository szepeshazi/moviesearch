import { Movie } from './movie';

export class MovieDetail extends Movie {
    rated: string;
    released: string;
    runtime: number;
    genre: string[];
    director: string;
    writer: string;
    actors: string[];
    plot: string;
    languages: string[];
    countries: string[];
    awards: string;
    metascore: number;
    imdbRating: string;
    imdbVotes: string;

	static createFromServerResponse(item) : MovieDetail {
		let movieDetail = Object.assign(new MovieDetail(), Movie.createFromServerResponse(item));

        movieDetail.rated = item.Rated;
        movieDetail.released = item.Released;
        movieDetail.runtime = Number(item.Runtime.split(" ")[0]);
        movieDetail.genre = item.Genre.split(",").map(genre => genre.trim());
        movieDetail.director = item.Director;
        movieDetail.writer = item.Writer;
        movieDetail.actors = item.Actors.split(",").map(actor => actor.trim());
        movieDetail.plot = item.Plot;
        movieDetail.languages = item.Language.split(",").map(language => language.trim());
        movieDetail.countries = item.Country.split(",").map(country => country.trim());
        movieDetail.awards = item.Awards;
        movieDetail.metascore = Number(item.Metascore);
        movieDetail.imdbRating = item.imdbRating;
        movieDetail.imdbVotes = item.imdbVotes;

		return movieDetail;
	}
    
}