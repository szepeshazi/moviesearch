import { DelayedImageComponent } from './delayed-image.component';
import { DelayedImageService } from './delayed-image.service';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('DelayedImageComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;
	let delayedImage: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DelayedImageComponent, TestHostComponent],
			providers: [DelayedImageService],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestHostComponent);
		testHost = fixture.componentInstance;
		fixture.detectChanges();
		delayedImage = fixture.debugElement.query(By.css('img'));
	});

	it('should create the test host component for the delayed image', () => {
		expect(testHost).toBeTruthy();
	});

	it('should populate the src attribute with 500ms delay', done => {
		expect(delayedImage.nativeElement.src).toContain('/assets/images/no-image.png',
			'should have an src pointing to the placeholder image initially');
		setTimeout(() => {
			fixture.detectChanges();
			done();
			expect(delayedImage.nativeElement.src).toBeTruthy();
		}, 1000);
	});

	it('should what now', () => {
		expect(delayedImage.nativeElement.src).toEqual(testHost.poster, 'should have the poster url as src attribute');
	});

	it('should be clickable', () => {
		delayedImage.nativeElement.click();
		expect(testHost.navigated).toBeTruthy('click event should be received by host component');
	});

});

@Component({
	template: `
		<app-img-delayed [src]="poster" [imageId]="imdbId" title="Poster" alt="{{ title }}" (click)="navigateTo(entity)">
		</app-img-delayed>
	`
})
class TestHostComponent {

	readonly poster = 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg';
	readonly imdbId = 'tt0372784';
	readonly title = 'Batman begins';

	navigated = false;

	navigateTo(entity) {
		this.navigated = true;
	}
}
