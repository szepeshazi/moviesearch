import { Movie } from '../model/movie';
import { MovieItemComponent } from './movie-item.component';
import { it } from '@angular/cli/lib/ast-tools/spec-utils';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('MovieItemComponent', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MovieItemComponent, TestHostComponent],
			providers: [
				{ provide: Router, useClass: RouterStub }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the test host component for the movie item', () => {
		expect(component).toBeTruthy();
	});


	it('should display the movie title and image in the template', () => {
		fixture.detectChanges();
		let de = fixture.debugElement.query(By.css('div.title'));
		expect(de.nativeElement.textContent).toContain('Batman', 'title should contain the word "Batman"');
		de = fixture.debugElement.query(By.css('img'));
		expect(de.nativeElement.src).toBeTruthy("image should have a valid src property");

	});

});


@Component({
	template: `<movie-item [entity]="movie" (selected)="onSelected($event)"></movie-item>`
})
class TestHostComponent {

	movie: Movie = {
		title: "Batman begins",
		year: "2005",
		imdbId: "tt0372784",
		type: "movie",
		poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
		imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
		imageRetryCount: 0
	};

	onSelected(event) {

	}
}

class RouterStub {

}


