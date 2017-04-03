import { HttpResponse } from './http-response';
import { Movie } from './movie';

export class SearchResult implements HttpResponse {
	static readonly pageSize = 10;

	term: string;
	totalResults: number;
	movies: Movie[];

	status: string;
	message: string;
}
