import { MovieService } from '../movie.service';
import { FakeMovieService } from '../testing/fake-movie.service';
import { MovieSearchComponent } from './movie-search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

describe('MovieSearchComponent', () => {
	let component: MovieSearchComponent;
	let fixture: ComponentFixture<MovieSearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [InfiniteScrollModule],
			declarations: [MovieSearchComponent],
			providers: [
				{ provide: MovieService, useClass: FakeMovieService },
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

		// Get rid of other background tasks (i.e. image loader)
		discardPeriodicTasks();
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

		// Get rid of other background tasks (i.e. image loader)
		discardPeriodicTasks();
		fixture.detectChanges();
		const de = fixture.debugElement.query(By.css('div#search-results'));
		expect(de).toBeTruthy('should be a search results div present');
		const movieItems = fixture.debugElement.queryAll(By.css('app-movie-item'));
		expect(movieItems.length).toEqual(10, 'should display 10 Batman movies initially');
	}));

});
