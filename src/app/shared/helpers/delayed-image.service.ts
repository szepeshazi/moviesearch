import { Observable, Subject } from 'rxjs/Rx';
import { DelayedImage } from './delayed-image';
export class DelayedImageService {

	private imageTimer = undefined;
	private readonly imageInterval = 500;

	private images: DelayedImage[] = [];
	private populatedImage = new Subject<DelayedImage>();
	public populatedImageStream = this.populatedImage.asObservable();

	add(image: DelayedImage) {
		this.images.push(image);
		if (this.imageTimer === undefined) {
			this.startImageTimer();
		}
	}

	startImageTimer(): void {
		// Delay image loads to offset IMDB throttling of img requests coming through a referral site
		this.imageTimer = setInterval(() => {
			let image = this.images.shift();
			while (image !== undefined && image.isCached()) {
				image = this.images.shift();
			}
			if (!image) {
				clearInterval(this.imageTimer);
				this.imageTimer = undefined;
			} else {
				image.cache();
				image.display();
				this.populatedImage.next(image);
			}
		}, this.imageInterval);
	}
}
