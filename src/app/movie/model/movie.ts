export class Movie {
	title: string;
	year: string;
	imdbId: string;
	type: string;
	poster: string;

	static createFromServerResponse(item): Movie {
		const movie = new Movie();
		movie.title = item.Title;
		movie.year = item.Year;
		movie.imdbId = item.imdbID;
		movie.type = item.Type === 'N/A' ? undefined : item.Type;
		movie.poster = item.Poster === 'N/A' ? undefined : item.Poster;
		return movie;
	}
}
