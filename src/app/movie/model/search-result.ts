import { Movie } from './movie';

export class SearchResult {
    static readonly pageSize = 10;

    term: string;
    totalResults: number;
    movies: Movie[];
}