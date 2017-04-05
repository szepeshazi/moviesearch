import { DelayedImage } from './delayed-image';
import { DelayedImageService } from './delayed-image.service';

describe('DelayedImageService', () => {
	let service: DelayedImageService;
	beforeEach(() => { service = new DelayedImageService(); });

	it('should populate the src attribute with 500ms delay', done => {
		const delayedImage = new DelayedImage('id', 'src');
		expect(delayedImage.src).toBeFalsy('should have an empty src attribute by default');
		service.add(delayedImage);
		setTimeout(() => {
			expect(delayedImage.src).toBe('src' , 'should have a populated src attribute after delay');
			done();
		}, 1000);
	});

	it('should use cache on second hit for the same image', done => {
		const delayedImage = new DelayedImage('second_id', 'src2');
		expect(delayedImage.src).toBeFalsy('should have an empty src attribute by default');
		service.add(delayedImage);
		service.add(new DelayedImage('third_id', 'src3'));
		setTimeout(() => {
			expect(delayedImage.src).toBe('src2' , 'should have a populated src attribute after delay');
			const sameImageRef = new DelayedImage('second_id', 'src2');
			service.add(sameImageRef);
			expect(sameImageRef.isCached()).toBe(true, 'should be cached on the second reference');
			expect(sameImageRef.src).toBe('src2', 'should have a populated src attribute immediately');
			done();
		}, 1000);
	});

});
