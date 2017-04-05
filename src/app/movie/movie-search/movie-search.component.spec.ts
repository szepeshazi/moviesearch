import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MovieService } from '../movie.service';
import { FakeMovieService } from '../testing/fake-movie.service';
import { MovieSearchComponent } from './movie-search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

describe('MovieSearchComponent', () => {
	let component: MovieSearchComponent;
	let fixture: ComponentFixture<MovieSearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [InfiniteScrollModule, NoopAnimationsModule, MaterialModule.forRoot()],
			declarations: [MovieSearchComponent],
			providers: [
				{ provide: MovieService, useClass: FakeMovieService }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MovieSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the search component', () => {
		expect(component).toBeTruthy();
	});

	it('should have an input field for entering search expressions', () => {
		const input = fixture.debugElement.query(By.css('input#searchBox')).nativeElement;
		expect(input).toBeTruthy();
	});

	it('should display empty list for empty search expression', fakeAsync(() => {
		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = '';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(500);

		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeFalsy('There should not be a search results div for empty search expression');
	}));

	it('should display 10 initial results for the search expression "batman"', fakeAsync(() => {
		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'batman';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(500);

		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeTruthy('should be a search results div present');
		const movieItems = fixture.debugElement.queryAll(By.css('app-movie-item'));
		expect(movieItems.length).toEqual(10, 'should display 10 Batman movies initially');
	}));


	it('should display 2 addititional results for the search expression "batman" after scrolling to the bottom', fakeAsync(() => {
		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'batman';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(500);

		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeTruthy('should be a search results div present');
		const movieItems = fixture.debugElement.queryAll(By.css('app-movie-item'));
		expect(movieItems.length).toEqual(10, 'should display 10 Batman movies initially');

		component.loadNext();
		tick();

		fixture.detectChanges();
		const updatedMovieItems = fixture.debugElement.queryAll(By.css('app-movie-item'));
		expect(updatedMovieItems.length).toEqual(12, 'should display 2 additional Batman movies when scrolling down');
	}));

	it('should show an error message for the search expression "error-expression"', fakeAsync(() => {
		const snackBar = component.snackBar;
		expect(snackBar._openedSnackBarRef).toBeFalsy('should NOT show SnackBar notification');

		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'error-expression';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(500);

		fixture.detectChanges();
		tick(1000);

		expect(snackBar._openedSnackBarRef).toBeTruthy('should show SnackBar notification');
		// Wait until snackbar closes
		tick(3000);

		expect(snackBar._openedSnackBarRef).toBeFalsy('should hide SnackBar notification after 3 seconds');
	}));

	it('should show an error message for a consecutive search for "error-expression"', fakeAsync(() => {
		const snackBar = component.snackBar;
		expect(snackBar._openedSnackBarRef).toBeFalsy('should NOT show SnackBar notification');
		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'batman';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(500);

		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeTruthy('should be a search results div present');
		const movieItems = fixture.debugElement.queryAll(By.css('app-movie-item'));
		expect(movieItems.length).toEqual(10, 'should display 10 Batman movies initially');

		component.searchResult.term = 'error-expression';
		component.loadNext();
		tick();
		fixture.detectChanges();
		tick(1000);

		expect(snackBar._openedSnackBarRef).toBeTruthy('should show SnackBar notification');
		// Wait until snackbar closes
		tick(3000);
		expect(snackBar._openedSnackBarRef).toBeFalsy('should hide SnackBar notification after 3 seconds');
	}));

	it('should have a success status message but no movies for the search expression "empty-expression"', fakeAsync(() => {

		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'empty-expression';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(500);

		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeFalsy('should not be a search results div present');
	}));


	it('should cancel search if expression is deleted while executing search', fakeAsync(() => {
		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'love';
		input.triggerEventHandler('keyup', input.nativeElement.value);

		// Simulate pause in typing
		tick(300);
		fixture.detectChanges();

		input.nativeElement.value = '';
		// Simulate pause in typing
		tick(300);
		fixture.detectChanges();
		discardPeriodicTasks();

		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeFalsy('should not be a search results div present');
	}));

	it('should cancel previous search if a new expression is entered while executing search', done => {
		const input = fixture.debugElement.query(By.css('input#searchBox'));
		input.nativeElement.value = 'love';
		input.triggerEventHandler('keyup', input.nativeElement.value);
		fixture.detectChanges();

		// Simulate pause in typing
		setTimeout(function () {
			input.nativeElement.value = 'hate';
			fixture.detectChanges();

			// Wait for the delayed observable to finish the query
			setTimeout(function () {
				fixture.detectChanges();
				const de = fixture.debugElement.query(By.css('div#search-results'));
				expect(de).toBeTruthy('should have a search results div present');
				done();
			}, 2000);

		}, 500);
	});

	function timeDelay(ms: number): Promise<undefined> {
		return new Promise<undefined>(function (resolve, reject) {
			setTimeout(resolve(undefined), ms);
		});
	}


});
