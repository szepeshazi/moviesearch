import { DelayedImageComponent } from './delayed-image.component';
import { DelayedImageService } from './delayed-image.service';
import { it } from '@angular/cli/lib/ast-tools/spec-utils';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('DelayedImageComponent', () => {
	let testHost: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

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
	});

	it('should create the test host component for the delayed image', () => {
		expect(testHost).toBeTruthy();
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

	navigateTo(entity) { }
}
