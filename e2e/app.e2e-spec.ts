import { browser, protractor } from 'protractor/built';
import { setTimeout } from 'timers';
import { MoviesearchPage } from './app.po';

describe('moviesearch App', () => {
	let page: MoviesearchPage;

	beforeEach(() => {
		page = new MoviesearchPage();
	});

	it('should load the movie search page', () => {
		page.navigateTo();
		const title = page.getTitle();
		expect(title).toEqual('Movie explorer', 'should have the title "Movie explorer');
		const searchBox = page.getSearchBox();
		expect(searchBox).toBeTruthy('should contain a search box');
		expect(searchBox.getText()).toBe('', 'should be an empty search box by default');
	});

	it('should return movie items when searching for "batman"', () => {
		page.navigateTo();

		// Send search expression
		const searchBox = page.getSearchBox();
		searchBox.sendKeys('batman');

		// Wait for the results
		const until = protractor.ExpectedConditions;
		const resultsContainer = page.getSearchResultsContainer();
		browser.wait(until.presenceOf(resultsContainer), 5000, 'should have a container div for the results');

		// Verify initial result count
		const results = page.getSearchResults();
		results.count().then(size => {
			expect(size).toEqual(10, 'should display 10 results initially');
		});

		// Scroll down to last result element
		const lastResult = results.get(9);
		browser.executeScript(function (el) {
			el.scrollIntoView();
		}, lastResult.getWebElement());

		const nextLastResult = results.get(19);
		browser.wait(until.presenceOf(nextLastResult), 5000, 'should display further results upon scrolling down');

	});

});
