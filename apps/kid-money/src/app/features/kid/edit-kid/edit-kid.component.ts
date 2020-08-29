import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

import { DataService } from './../../../../../../../libs/data/src/lib/services/data/data.service';
import { Kid } from './../../../../../../../libs/entities/kid-money/kid';

@Component({
	selector: 'edit-kid',
	templateUrl: `./edit-kid.component.html`,
	styles: []
})
export class EditKidComponent implements OnInit, OnDestroy {
	kidForm: FormGroup;

	kids$;
	activeKid$;
	pictures: any[] = [];

	constructor(
		public dataService: DataService,
		private fb: FormBuilder,
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.kids$ = this.dataService.selectAll(Kid).subscribe((kids) => {
			const kidId = this.route.snapshot.params['id'];
			this.dataService.setActive(Kid, kidId);
		});

		this.activeKid$ = this.dataService.selectActive(Kid).subscribe((kid: Kid) => {
			this.createKidForm(kid);
		});
	}

	ngOnDestroy() {
		if (this.activeKid$) {
			this.activeKid$.unsubscribe();
		}
		if (this.kids$) {
			this.kids$.unsubscribe();
		}
	}

	createKidForm(kid?: Kid) {
		if (!kid) {
			this.kidForm = this.fb.group({
				id: '',
				firstName: '',
				lastName: '',
				birthday: null,
				gender: '',
				notes: '',
				money: '',
				transactions: [],
				pictures: []
			});
			return;
		}
		this.kidForm = this.fb.group({
			id: kid.id,
			firstName: kid.firstName || '',
			lastName: kid.lastName || '',
			birthday: kid.birthday ? new Date(kid.birthday) : null,
			gender: kid.gender || '',
			notes: kid.notes || '',
			money: kid.money || '',
			transaction: [],
			pictures: kid.pictures || []
		});

		this.pictures = kid.pictures;
	}

	onSubmit() {
		const updatedKid = { ...this.kidForm.value, pictures: this.pictures };
		this.dataService
			.save(Kid, updatedKid)
			.pipe(take(1))
			.subscribe((res: Kid) => {
				this.router.navigate(['../'], { relativeTo: this.route });
				this.messageService.add({
					severity: 'success',
					summary: 'Saved',
					detail: `Successfully saved ${res.fullName}`
				});
			});
	}

	onDelete() {
		console.log('Delete', this.kidForm.value);
	}

	async uploadPictures(event) {
		for (let file of event.files) {
			this.pictures.push({
				name: file.name,
				size: file.size,
				lastModified: file.lastModified,
				type: file.type,
				file: file
			});
		}
	}

	getPictureSrc(picture: any) {
		return ``;
	}
}
