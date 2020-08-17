import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Kid, Picture } from '@entities';
import { DataService } from '@lib/data';
import { take } from 'rxjs/operators';

@Component({
	selector: 'edit-kid',
	template: `
		<ng-container *ngIf="dataService.selectActive('Kid') | async as activeKid">
			<lib-page-container>
				<ng-template #main>
					<p-card
						[header]="'Edit ' + activeKid.firstName"
						styleClass="bg-white mt-3 mb-3"
					>
						<form
							*ngIf="kidForm"
							[formGroup]="kidForm"
							(ngSubmit)="onSubmit()"
							class="d-flex flex-wrap"
						>
							<!-- <div *ngFor="let picture of pictures">
								{{ picture.name }}
								<img [src]="getPictureSrc(picture)" />
							</div> -->

							<div class="mb-5 col-12 border-bottom pb-3">
								<p style="font-weight:bold;font-size:1.25;" for="money">
									Current Money
								</p>
								<p-inputNumber
									id="money"
									formControlName="money"
									class="w-100"
									mode="decimal"
									[maxFractionDigits]="2"
								></p-inputNumber>
							</div>

							<div class="mb-5 col-6">
								<span class="p-float-label">
									<input
										pInputText
										id="firstName"
										type="text"
										formControlName="firstName"
										class="w-100"
									/>
									<label for="firstName">First Name</label>
								</span>
							</div>
							<div class="mb-5 col-6">
								<span class="p-float-label">
									<input
										pInputText
										id="lastName"
										type="text"
										formControlName="lastName"
										class="w-100"
									/>
									<label for="lastName">Last Name</label>
								</span>
							</div>

							<div class="mb-5 col-12">
								<span class="p-float-label">
									<p-calendar
										formControlName="birthday"
										[showIcon]="true"
										[touchUI]="true"
										[monthNavigator]="true"
										[yearNavigator]="true"
										yearRange="1950:2030"
										[showTime]="true"
										[showButtonBar]="true"
										class="w-100"
									></p-calendar>
									<label for="lastName">Birthday</label>
								</span>
							</div>

							<div class="mb-5 col-12">
								<span class="p-float-label w-100">
									<p-dropdown
										[options]="[
											{ label: '', value: null },
											{ label: 'Male', value: 'M' },
											{ label: 'Female', value: 'F' }
										]"
										formControlName="gender"
										class="w-100"
									></p-dropdown>
									<label for="gender">Gender</label>
								</span>
							</div>

							<div class="mb-5 col-12">
								<span class="p-float-label">
									<textarea
										pInputTextarea
										id="notes"
										type="text"
										formControlName="notes"
										[autoResize]="true"
										class="w-100"
									></textarea>
									<label for="notes">Notes</label>
								</span>
							</div>

							<div class="mb-5 col-12">
								<h4 class="w-100 border-bottom">Pictures</h4>
								<p-fileUpload
									#picauto
									multiple="multiple"
									accept="image/*"
									maxFileSize="10000000"
									[auto]="true"
									chooseLabel="Browse Pictures"
									customUpload="true"
									(uploadHandler)="uploadPictures($event)"
								>
								</p-fileUpload>
							</div>
						</form>
					</p-card>
				</ng-template>
				<ng-template #footer>
					<div class="mt-1 w-100 d-flex">
						<button
							pButton
							icon="pi pi-trash"
							label="Delete"
							(click)="onDelete()"
							class="w-50 bg-danger"
						></button>
						<button
							pButton
							icon="pi pi-save"
							label="Save"
							(click)="onSubmit()"
							class="w-50 ml-auto"
						></button>
					</div>
				</ng-template>
			</lib-page-container>
		</ng-container>
	`,
	styles: [
		`
			body .p-calendar.p-calendar-w-btn .p-inputtext {
				width: 87%;
			}

			.p-calendar {
				width: 100%;
			}

			.p-dropdown {
				width: 100%;
			}

			.p-inputnumber {
				width: 100%;
			}
		`
	],
	encapsulation: ViewEncapsulation.None
})
export class EditKidComponent implements OnInit, OnDestroy {
	kidForm: FormGroup;

	kids$;
	activeKid$;
	pictures: any[] = [];

	constructor(
		public dataService: DataService,
		private fb: FormBuilder,
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
			.subscribe((res) => {
				console.log(res);
			});
	}

	onDelete() {
		console.log('Delete', this.kidForm.value);
	}

	async uploadPictures(event) {
		for (let file of event.files) {
			console.log(file);
			let blob = await fetch(file.objectURL.changingThisBreaksApplicationSecurity).then((r) =>
				r.blob()
			);
			// .then((blobFile) => new File([blobFile], file.name, { type: 'image/png' }));
			this.pictures.push({
				name: file.name,
				size: file.size,
				lastModified: file.lastModified,
				type: file.type,
				data: blob
			});
		}
	}

	getPictureSrc(picture: any) {
		return `data:image/jpg;base64,${this.toBase64(picture.data.data)}`;
	}

	toBase64(arr) {
		return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
	}
}
