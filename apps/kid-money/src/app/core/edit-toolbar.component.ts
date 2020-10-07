import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'edit-toolbar',
	template: `
		<div class="mt-1 w-100 d-flex">
			<button
				pButton
				icon="pi pi-trash"
				label="Delete"
				(click)="delete.emit()"
				class="w-50 bg-danger"
				*ngIf="!hideDelete"
			></button>
			<button
				pButton
				icon="pi pi-save"
				label="Save"
				(click)="save.emit()"
				class="w-50 ml-auto"
			></button>
		</div>
	`,
	styles: [``]
})
export class EditToolbarComponent implements OnInit {
	@Input() hideDelete: boolean;

	@Output() delete = new EventEmitter<any>();
	@Output() save = new EventEmitter<any>();

	constructor() {}

	ngOnInit(): void {}
}
