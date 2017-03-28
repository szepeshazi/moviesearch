import { Movie } from './movie';

export interface MovieDetail extends Movie {
    rated: string;
    released: string;
    runtime: number;
    genre: string[];
    director: string;
    writer: string;
    actors: string[];
    plot: string;
    languages: string[];
    country: string;
    awards: string;
    metascore: number;
    imdbRating: number;
    imdbVotes: number;
}