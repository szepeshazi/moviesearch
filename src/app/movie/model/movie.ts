
export class Movie {
    title: string;
    year: string;
    imdbId: string;
    type: string;
    poster: string;

	// Virtual properties for multiple attempts at loading images - IMDB throttles img requests coming through a referral site
	imageUrl: string = undefined;
	imageRetryCount : number = 0;
	static readonly maxImageRetries = 2;

	static createFromServerResponse(item) : Movie {
		let movie = new Movie();
		movie.title = item.Title;
		movie.year = item.Year;
		movie.imdbId = item.imdbID;
		movie.type = item.Type === "N/A" ? undefined : item.Type;
		movie.poster = item.Poster === "N/A" ? undefined : item.Poster;
		if (sessionStorage.getItem(movie.imdbId)) {
			movie.imageUrl = movie.poster;
		}
		return movie;
	}
}