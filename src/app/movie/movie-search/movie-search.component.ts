import { Movie } from '../model/movie';
import { SearchResult } from '../model/search-result';
import { MovieService } from '../movie.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';


@Component({
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

	private searchTerms = new Subject<string>();
	private subscriptions: Subscription[] = [];
	private currentHttpRequest: Subscription;

	private imageTimer = undefined;
	private readonly imageInterval = 500;

	@ViewChild("searchBox") searchBoxRef;

	public searchResult: SearchResult;

	constructor(private movieService: MovieService) { }

	ngOnInit() {
		let previousSearch = sessionStorage.getItem("searchResult");
		if (previousSearch) {
			try {
				this.searchResult = JSON.parse(previousSearch);
				if (this.searchResult.term) {
					this.searchBoxRef.nativeElement.value = this.searchResult.term;
				}
			} catch (error) {
				this.searchResult = undefined;
			}
		}
		this.subscribeToSearch();
	}

	ngOnDestroy() {
		for (let subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
		if (this.imageTimer !== undefined) {
			clearInterval(this.imageTimer);
			this.imageTimer = undefined;
		}
		if (this.searchResult) {
			try {
				let currentSearch = JSON.stringify(this.searchResult);
				sessionStorage.setItem("searchResult", currentSearch);
			} catch (error) {
				sessionStorage.removeItem("searchResult");
			}
		}
	}

	subscribeToSearch() {
		let searchSubscription = this.searchTerms.asObservable()
			.debounceTime(300)
			.distinctUntilChanged()
			.subscribe(term => {
				if (term.length === 0) {
					return;
				}
				if (this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed) {
					this.currentHttpRequest.unsubscribe();
				}
				this.currentHttpRequest = this.movieService.search(term).subscribe(
					searchResult => {
						this.searchResult = searchResult;
						this.currentHttpRequest = undefined;
						if (this.imageTimer === undefined) {
							this.startImageTimer();
						}
					});
			});
		this.subscriptions.push(searchSubscription);
	}

	search(term: string): void {
		if (term.length === 0) {
			this.searchResult = undefined;
			sessionStorage.removeItem("searchResult");
			if (this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed) {
				this.currentHttpRequest.unsubscribe();
			}
			this.currentHttpRequest = undefined;
			if (this.imageTimer !== undefined) {
				clearInterval(this.imageTimer);
				this.imageTimer = undefined;
			}
		}
		this.searchTerms.next(term);

	}

	isSearchInProgress(): boolean {
		return this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed;
	}

	startImageTimer(): void {
		this.imageTimer = setInterval(() => {
			if (this.searchResult !== undefined && this.searchResult.movies.length > 0) {
				let index = this.searchResult.movies.findIndex(
					movie => ((movie.poster !== undefined) && (movie.imageUrl === undefined) && (movie.imageRetryCount < Movie.maxImageRetries))
				);
				if (index === -1) {
					clearInterval(this.imageTimer);
					this.imageTimer = undefined;
				} else {
					let movie: Movie = this.searchResult.movies[index];
					this.searchResult.movies[index] = Object.assign(new Movie(), movie, { imageUrl: movie.poster });
					sessionStorage.setItem(movie.imdbId, "y");
				}
			}
		}, this.imageInterval);
	}

	onScroll(): void {
		if (this.searchResult !== undefined && !this.isSearchInProgress()) {
			let currentPage = Math.floor((this.searchResult.movies.length - 1) / SearchResult.pageSize) + 1;
			if (currentPage * SearchResult.pageSize < this.searchResult.totalResults) {
				this.currentHttpRequest = this.movieService.search(this.searchResult.term, currentPage + 1).subscribe(
					pageResult => {
						this.searchResult.totalResults = Number(pageResult.totalResults);
						this.searchResult.movies = this.searchResult.movies.concat(pageResult.movies);
						this.currentHttpRequest = undefined;
						if (this.imageTimer === undefined) {
							this.startImageTimer();
						}
					});
			}
		}
	}

}
