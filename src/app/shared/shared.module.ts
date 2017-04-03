import { DelayedImageService } from './helpers/delayed-image.service';
import { DelayedImageComponent } from './helpers/delayed-image.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
	imports: [CommonModule],
	declarations: [DelayedImageComponent],
	exports: [CommonModule, DelayedImageComponent],
	providers: [DelayedImageService]
})
export class SharedModule { }
