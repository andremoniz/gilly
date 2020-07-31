import { async, TestBed } from '@angular/core/testing';
import { AppShellModule } from './app-shell.module';

describe('AppShellModule', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [AppShellModule]
		}).compileComponents();
	}));

	it('should create', () => {
		expect(AppShellModule).toBeDefined();
	});
});
