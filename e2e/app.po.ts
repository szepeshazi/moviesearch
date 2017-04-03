import { browser, element, by } from 'protractor';

export class MoviesearchPage {
	navigateTo() {
		return browser.get('/');
	}

	getTitle() {
		return element(by.css('div.container h3')).getText();
	}

	getSearchBox() {
		return element(by.css('input#searchBox'));
	}

	getSearchResultsContainer() {
		return element(by.id('search-results'));
	}

	getSearchResults() {
		return element.all(by.css('div#search-results app-movie-item'));
	}
}
