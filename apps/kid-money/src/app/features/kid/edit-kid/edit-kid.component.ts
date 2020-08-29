import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { FormConfigService } from '../../../../../../../libs/utilities/src/lib/services/form-config.service';
import { KidService } from '../kid.service';
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
		public kidService: KidService,
		private formConfigService: FormConfigService,
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
			this.kidForm = this.formConfigService.createFormFromConfig(Kid.fieldConfig, kid);
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

	onSubmit() {
		const updatedKid = { ...this.kidForm.value, pictures: this.pictures };
		this.kidService.saveKid(updatedKid);
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	onDelete() {
		if (confirm(`Are you sure you want to delete ${this.kidForm.get('firstName').value}?`)) {
			this.kidService.deleteKid(this.kidForm.value);
		}
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
