import { async, TestBed } from '@angular/core/testing';
import { UtilitiesModule } from './utilities.module';

describe('UtilitiesModule', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [UtilitiesModule]
		}).compileComponents();
	}));

	it('should create', () => {
		expect(UtilitiesModule).toBeDefined();
	});
});
