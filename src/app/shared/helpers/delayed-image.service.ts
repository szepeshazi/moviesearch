import { DelayedImage } from './delayed-image';
export class DelayedImageService {

	images: DelayedImage[] = [];

	private imageTimer = undefined;
	private readonly imageInterval = 500;

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
			}
		}, this.imageInterval);
	}
}
