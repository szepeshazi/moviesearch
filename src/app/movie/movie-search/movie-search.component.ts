import { SearchResult } from '../model/search-result';
import { MovieService } from '../movie.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Subject, Subscription } from 'rxjs/Rx';


@Component({
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

	private searchTerms = new Subject<string>();
	private subscriptions: Subscription[] = [];
	private currentHttpRequest: Subscription;

	@ViewChild('searchBox') searchBoxRef;

	public searchResult: SearchResult;

	constructor(private movieService: MovieService, public snackBar: MdSnackBar) { }

	ngOnInit() {
		const previousSearch = sessionStorage.getItem('searchResult');
		if (previousSearch) {
			this.searchResult = JSON.parse(previousSearch);
			this.searchBoxRef.nativeElement.value = this.searchResult.term;
			this.searchResult = undefined;
		}
		this.subscribeToSearch();
	}

	ngOnDestroy() {
		for (const subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
		if (this.searchResult) {
			try {
				const currentSearch = JSON.stringify(this.searchResult);
				sessionStorage.setItem('searchResult', currentSearch);
			} catch (error) {
				sessionStorage.removeItem('searchResult');
			}
		}
	}

	subscribeToSearch() {
		const searchSubscription = this.searchTerms.asObservable()
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
						if (searchResult.status === 'success') {
							this.searchResult = searchResult;
							this.currentHttpRequest = undefined;
						} else {
							this.snackBar.open('Service not available, please try again later.', undefined, {
								duration: 3000,
							});
						}
					});
			});
		this.subscriptions.push(searchSubscription);
	}

	search(term: string): void {
		if (term.length === 0) {
			this.searchResult = undefined;
			sessionStorage.removeItem('searchResult');
			if (this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed) {
				this.currentHttpRequest.unsubscribe();
			}
			this.currentHttpRequest = undefined;
		}
		this.searchTerms.next(term);
	}

	isSearchInProgress(): boolean {
		return this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed;
	}

	loadNext(): void {
		if (this.searchResult !== undefined && !this.isSearchInProgress()) {
			const currentPage = Math.floor((this.searchResult.movies.length - 1) / SearchResult.pageSize) + 1;
			if (currentPage * SearchResult.pageSize < this.searchResult.totalResults) {
				this.currentHttpRequest = this.movieService.search(this.searchResult.term, currentPage + 1).subscribe(
					pageResult => {
						if (pageResult.status === 'success') {
							this.searchResult.totalResults = Number(pageResult.totalResults);
							this.searchResult.movies = this.searchResult.movies.concat(pageResult.movies);
							this.currentHttpRequest = undefined;
						} else {
							this.snackBar.open('Service not available, please try again later.', undefined, {
								duration: 3000,
							});
						}
					});
			}
		}
	}

}
