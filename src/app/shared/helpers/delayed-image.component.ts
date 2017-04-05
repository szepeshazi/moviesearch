import { DelayedImage } from './delayed-image';
import { DelayedImageService } from './delayed-image.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
	selector: 'app-img-delayed',
	templateUrl: './delayed-image.component.html',
	styleUrls: ['./delayed-image.component.scss']
})
export class DelayedImageComponent implements OnInit {

	delayedImage: DelayedImage;

	@Input() src: string;
	@Input() imageId: string;
	@Input() alt: string;
	@Input() title: string;

	@Output() click = new EventEmitter<undefined>();

	constructor(private delayedImageService: DelayedImageService) { }

	ngOnInit() {
		this.delayedImage = new DelayedImage(this.imageId, this.src);
		if (!this.delayedImage.isCached()) {
			this.delayedImageService.add(this.delayedImage);
			this.delayedImageService.populatedImageStream.subscribe(
				image => {
					if (image.id === this.delayedImage.id) {
						this.delayedImage = Object.assign({}, image) as DelayedImage;
					}
				});
		}
	}

	onClick() {
		this.click.emit();
	}
}
