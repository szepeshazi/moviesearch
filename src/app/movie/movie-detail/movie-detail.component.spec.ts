import { MovieService } from '../movie.service';
import { FakeMovieService } from '../testing/fake-movie.service';
import { MovieDetailComponent } from './movie-detail.component';
import { it } from '@angular/cli/lib/ast-tools/spec-utils';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UrlSegment } from '@angular/router/router';
import { Observable } from 'rxjs/Rx';

describe('MovieDetailComponent', () => {
	let component: MovieDetailComponent;
	let fixture: ComponentFixture<MovieDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MovieDetailComponent],
			providers: [
				{ provide: MovieService, useClass: FakeMovieService },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStub }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MovieDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the movie detail component', () => {
		expect(component).toBeTruthy();
	});


	it('should have a MovieDetail object after ngOnInit', fakeAsync(() => {
		fixture.detectChanges();
		tick();
		expect(component.movieDetail).toBeTruthy();
	}));

	it('should display the movie title and image in the template', fakeAsync(() => {
		fixture.detectChanges();
		tick();
		let de = fixture.debugElement.query(By.css('h1'));
		expect(de.nativeElement.textContent).toContain('Batman', 'title should contain the word "Batman"');
		de = fixture.debugElement.query(By.css('img'));
		expect(de.nativeElement.src).toBeTruthy('image should have a valid src property');
	}));

});


describe('MovieDetailComponent with Error', () => {
	let component: MovieDetailComponent;
	let fixture: ComponentFixture<MovieDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MovieDetailComponent],
			providers: [
				{ provide: MovieService, useClass: FakeMovieService },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStubError }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MovieDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the movie detail component', () => {
		expect(component).toBeTruthy();
	});


	it('should have a MovieDetail object with error status after ngOnInit', fakeAsync(() => {
		fixture.detectChanges();
		tick();
		expect(component.movieDetail.status).toBe('error', 'should have an error status');
	}));

});

describe('MovieDetailComponent with no result', () => {
	let component: MovieDetailComponent;
	let fixture: ComponentFixture<MovieDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MovieDetailComponent],
			providers: [
				{ provide: MovieService, useClass: FakeMovieService },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStubEmpty }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MovieDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the movie detail component', () => {
		expect(component).toBeTruthy();
	});

	it('should have a MovieDetail object with success status but no movie details after ngOnInit', fakeAsync(() => {
		fixture.detectChanges();
		tick();
		expect(component.movieDetail.status).toBe('success', 'should have success status');
		expect(component.movieDetail.title).toBeFalsy('should not have a movie title');
	}));

});

class ActivatedRouteStub {

	urlSegment: UrlSegment[] = [
		{ path: '/movie', parameterMap: undefined, parameters: undefined },
		{ path: 'detail', parameterMap: undefined, parameters: undefined },
		{ path: 'tt0372784', parameterMap: undefined, parameters: undefined }
	];

	url = Observable.of(this.urlSegment);
}

class ActivatedRouteStubError {

	urlSegment: UrlSegment[] = [
		{ path: '/movie', parameterMap: undefined, parameters: undefined },
		{ path: 'detail', parameterMap: undefined, parameters: undefined },
		{ path: 'error-id', parameterMap: undefined, parameters: undefined }
	];

	url = Observable.of(this.urlSegment);
}

class ActivatedRouteStubEmpty {

	urlSegment: UrlSegment[] = [
		{ path: '/movie', parameterMap: undefined, parameters: undefined },
		{ path: 'detail', parameterMap: undefined, parameters: undefined },
		{ path: 'nonexistent-id', parameterMap: undefined, parameters: undefined }
	];

	url = Observable.of(this.urlSegment);
}
