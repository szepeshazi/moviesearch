import { SearchResult } from './model/search-result';
import { MOVIE_DETAIL } from './testing/mock-movie-details';
import { MOVIES } from './testing/mock-movies';
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestMethod, Response, XHRBackend } from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
	let mockBackend: MockBackend;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				MovieService,
				MockBackend,
				BaseRequestOptions,
				{
					provide: Http,
					deps: [MockBackend, BaseRequestOptions],
					useFactory:
					(backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
						return new Http(backend, defaultOptions);
					}
				}
			],
			imports: [
				HttpModule
			]
		});
		mockBackend = getTestBed().get(MockBackend);
	}));

	it('should return 10 movies for the search expression "batman"', done => {
		let movieService: MovieService;

		getTestBed().compileComponents().then(() => {
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockRespond(new Response(
						new ResponseOptions({
							body:
							{
								Search: MOVIES.slice(0, 10),
								totalResults: 12,
								Response: 'True'
							}
						}
						)));
				});

			movieService = getTestBed().get(MovieService);
			expect(movieService).toBeDefined();

			movieService.search('batman').subscribe(
				searchResult => {
					expect(searchResult.status).toBe('success', 'should get success as result status');
					expect(searchResult.movies.length).toBe(10, 'should get 10 results on first request');
					done();
				}
			);
		});
	});

	it('should return an additional 2 movies for the second page of search expression "batman"', done => {
		let movieService: MovieService;

		getTestBed().compileComponents().then(() => {
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockRespond(new Response(
						new ResponseOptions({
							body:
							{
								Search: MOVIES.slice(10, 12),
								totalResults: 12,
								Response: 'True'
							}
						}
						)));
				});

			movieService = getTestBed().get(MovieService);
			expect(movieService).toBeDefined();

			movieService.search('batman', 2).subscribe(
				searchResult => {
					expect(searchResult.status).toBe('success', 'should get success as result status');
					expect(searchResult.movies.length).toBe(2, 'should get 2 results on subsequent page 2 request');
					done();
				}
			);
		});
	});

	it('should not return any movies for expression "Bsdkjhfjsdfhj"', done => {
		let movieService: MovieService;

		getTestBed().compileComponents().then(() => {
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockRespond(new Response(
						new ResponseOptions({
							body:
							{
								Response: 'False',
								Error: 'Movie not found!'
							}
						}
						)));
				});

			movieService = getTestBed().get(MovieService);
			expect(movieService).toBeDefined();

			movieService.search('Bsdkjhfjsdfhj').subscribe(
				searchResult => {
					expect(searchResult.status).toBe('success', 'should get an error as result status');
					expect(searchResult.movies).toBeFalsy('should not have any movies in the result set');
					done();
				}
			);
		});
	});

	it('should not return a single movie for IMDB id "tt0372784"', done => {
		let movieService: MovieService;

		getTestBed().compileComponents().then(() => {
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockRespond(new Response(
						new ResponseOptions({
							body: MOVIE_DETAIL
						}
						)));
				});

			movieService = getTestBed().get(MovieService);
			expect(movieService).toBeDefined();

			movieService.getById('tt0372784').subscribe(
				movie => {
					expect(movie).toBeTruthy('should get a movie detail object as a result');
					expect(movie.title).toBe('Batman begins', 'should have the title "Batman begins"');
					done();
				}
			);
		});
	});


	it('should get an error response for getById when an exception is thrown', done => {
		let movieService: MovieService;

		getTestBed().compileComponents().then(() => {
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockError(new Error());
				});

			movieService = getTestBed().get(MovieService);
			expect(movieService).toBeDefined();

			movieService.getById('any-id').subscribe(
				movie => {
					expect(movie.status).toBe('error', 'should get an error status as result');
					done();
				}
			);
		});
	});

	it('should get an error response for search when an exception is thrown', done => {
		let movieService: MovieService;

		getTestBed().compileComponents().then(() => {
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockError(new Error());
				});

			movieService = getTestBed().get(MovieService);
			expect(movieService).toBeDefined();

			movieService.search('any expression').subscribe(
				searchResult => {
					expect(searchResult.status).toBe('error', 'should get an error status as result');
					expect(searchResult.movies).toBeFalsy('should be no movies in the result list');
					done();
				}
			);
		});
	});

});
