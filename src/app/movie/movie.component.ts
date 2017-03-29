import { SearchResult } from './model/search-result';
import { MovieService } from './movie.service';
import { Services } from '@angular/core/src/view';
import { OnDestroy } from '@angular/core/core';
import { Subject, Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { Movie } from './model/movie';

@Component({
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

	private searchTerms = new Subject<string>();
	private subscriptions: Subscription[] = [];
	private currentHttpRequest : Subscription;

	public searchResult: SearchResult;


	constructor(private movieService: MovieService) { }

	ngOnInit() {
		this.subscribeToSearch();
	}

	ngOnDestroy() {
		for (let subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
	}

	subscribeToSearch() {
		let searchSubscription = this.searchTerms.asObservable()
			.debounceTime(300)
			.distinctUntilChanged()
			.subscribe(term => {
				if (this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed) {
					this.currentHttpRequest.unsubscribe();
				}
				this.currentHttpRequest = this.movieService.search(term).subscribe(
					searchResult => {
						this.searchResult = searchResult;
						this.currentHttpRequest = undefined;
					});
			});
		this.subscriptions.push(searchSubscription);
	}

	search(term: string) {
		if (term.length === 0) {
			this.searchResult = undefined;
		} else {
			this.searchTerms.next(term);
		}
	}

	isSearchInProgress() : boolean {
		return this.currentHttpRequest !== undefined && !this.currentHttpRequest.closed;
	}

	onScroll() {
		if (this.searchResult !== undefined && !this.isSearchInProgress()) {
			let currentPage = Math.floor((this.searchResult.movies.length - 1) / SearchResult.pageSize) + 1;
			if (currentPage * SearchResult.pageSize < this.searchResult.totalResults) {
				this.currentHttpRequest = this.movieService.search(this.searchResult.term, currentPage + 1).subscribe(
					pageResult => {
						this.searchResult.totalResults = Number(pageResult.totalResults);
						this.searchResult.movies = this.searchResult.movies.concat(pageResult.movies);
						this.currentHttpRequest = undefined;
					});
			}
		}
	}

}
