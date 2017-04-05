export class DelayedImage {

	public src: string;

	constructor(public id: string, public originalSrc: string) {
		if (this.isCached()) {
			this.display();
		}
	}

	cache() {
		sessionStorage.setItem(this.id, 'cached');
	}

	isCached(): boolean {
		return sessionStorage.getItem(this.id) === 'cached';
	}

	display() {
		this.src = this.originalSrc;
	}
}
