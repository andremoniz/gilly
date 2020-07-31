import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import CalendarScroll from 'gantt-schedule-timeline-calendar/dist/CalendarScroll.plugin.js';
import GSTC from 'gantt-schedule-timeline-calendar/dist/index.esm.js';
import WeekendHighlight from 'gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin.js';

import { UIVisualizationBase, UIVisualizationConfig } from '../ui-visualization.base';
import { TimePeriods, UITimelineDisplayOptions } from './ui-timeline.interface';

@Component({
	selector: 'ui-timeline',
	template: `
		<ui-visualization (dimensionChange)="handleDimensionChange($event)">
			<ng-template #vis>
				<div class="w-100 d-flex justify-content-between align-items-center border-bottom">
					<div id="leftItems">
						<ng-container *ngIf="displayOptions && displayOptions.title">
							<h3>{{ displayOptions.title }}</h3>
						</ng-container>
					</div>

					<div id="rightItems" class="d-flex">
						<nz-slider
							[nzMin]="14"
							[nzMax]="28"
							class="mr-3"
							style="width:192px;"
							[formControl]="zoomControl"
							(nzOnAfterChange)="handleZoom($event)"
							[nzTipFormatter]="zoomSlideFormatter"
						></nz-slider>

						<div>
							<label class="mt-auto mb-auto">Time Period - </label>
							<nz-select
								class="mr-3"
								style="width:96px;"
								[(ngModel)]="period"
								(ngModelChange)="changePeriod($event)"
								nzBorderless
							>
								<nz-option nzValue="hour" nzLabel="Hour"></nz-option>
								<nz-option nzValue="day" nzLabel="Day"></nz-option>
								<nz-option nzValue="week" nzLabel="Week"></nz-option>
								<nz-option nzValue="month" nzLabel="Month"></nz-option>
								<nz-option nzValue="year" nzLabel="Year"></nz-option>
							</nz-select>
						</div>

						<!-- <button
						nz-button
						(click)="scrollToToday()"
						class="mr-3 bg-secondary text-white"
					>
						Today
					</button> -->
					</div>
				</div>

				<ng-container *ngIf="config">
					<gstc [config]="config" (onState)="onState($event)" #gstfContainer></gstc>
				</ng-container>
			</ng-template>
		</ui-visualization>
	`,
	styleUrls: ['ui-timeline.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UITimelineComponent extends UIVisualizationBase implements OnInit {
	config: any;
	gstcState: any;

	period: TimePeriods = TimePeriods.MONTH;

	zoomControl: FormControl;
	zoom: number = 26;

	pallete = [
		'#E74C3C',
		'#DA3C78',
		'#7E349D',
		'#0077C0',
		'#07ABA0',
		'#0EAC51',
		'#F1892D',
		'#E3724B',
		'#AE7C5B',
		'#6C7A89',
		'#758586',
		'#707070'
	];

	constructor(public cdRef: ChangeDetectorRef) {
		super(cdRef);

		this.configLoaded$.subscribe((config: UIVisualizationConfig) => {
			this.setupGSTCConfig(config.data, config.displayOptions);
		});

		this.zoomControl = new FormControl(this.zoom);
		this.zoomControl.valueChanges.subscribe((value) => {
			this.zoom = value;
			this.cdRef.detectChanges();
		});
	}

	ngOnInit(): void {}

	zoomSlideFormatter(value: number): string {
		let zoomString = '';

		switch (value) {
			case 14:
				zoomString = 'Hour Min';
				break;
			case 15:
				zoomString = 'Hour Middle';
				break;
			case 16:
				zoomString = 'Hour Max';
				break;
			case 17:
				zoomString = 'Day';
				break;
			case 18:
				zoomString = 'Days Min';
				break;
			case 19:
				zoomString = 'Days Max';
				break;
			case 20:
				zoomString = 'Months and Days Min';
				break;
			case 21:
				zoomString = 'Months and Days Middle';
				break;
			case 22:
				zoomString = 'Months and Days Max';
				break;
			case 23:
				zoomString = 'Months and Weeks Min';
				break;
			case 24:
				zoomString = 'Months and Weeks Middle';
				break;
			case 25:
				zoomString = 'Months and Weeks Max';
				break;
			case 26:
				zoomString = 'Year and Months Min';
				break;
			case 27:
				zoomString = 'Year and Months Max';
				break;
			case 28:
				zoomString = 'Year Max';
				break;
			default:
				zoomString = `${value}`;
				break;
		}

		return zoomString;
	}

	setupGSTCConfig(data: any[], displayOptions: UITimelineDisplayOptions) {
		if (!data || !displayOptions) return;

		this.config = null; // reset

		// Internal Config
		this.period = displayOptions.period || TimePeriods.MONTH;

		// Generate Rows
		const rows = {};
		const uniqueRows = new Set<String>();
		(data || [])
			.sort((a, b) => {
				const aVal = a[displayOptions.rowProp],
					bVal = b[displayOptions.rowProp];
				return aVal === bVal ? 0 : aVal > bVal ? 1 : -1;
			})
			.forEach((d) => uniqueRows.add(d[displayOptions.rowProp]));
		Array.from(uniqueRows).forEach((row: string, index: number) => {
			rows[row] = {
				laneNumber: index,
				id: row,
				label: row,
				parentId: undefined,
				expanded: true
			};
		});

		// Map Rows -> Items
		const items = {};
		(data || []).forEach((d) => {
			if (
				!(d[displayOptions.startProp] && this.isValidDate(d[displayOptions.startProp])) ||
				!(d[displayOptions.endProp] && this.isValidDate(d[displayOptions.endProp]))
			) {
				return; // No date, don't include this item
			}

			// Create sub row to house this
			rows[d['id']] = {
				id: d['id'],
				label: d[displayOptions.labelProp],
				parentId: d[displayOptions.rowProp],
				expanded: false
			};

			items[d['id']] = {
				...d,
				id: d['id'],
				label: d[displayOptions.labelProp],
				time: {
					start: new Date(d[displayOptions.startProp]).getTime(),
					end: new Date(d[displayOptions.endProp]).getTime()
				},
				rowId: d['id'],
				style: {
					background: this.pallete[rows[d[displayOptions.rowProp]].laneNumber] || 'navy'
				}
			};
		});

		// Left Hand Column
		const columns = {
			percent: 100,
			resizer: {
				inRealTime: true
			},
			data: {
				label: {
					id: 'label',
					data: 'label',
					expander: true,
					isHtml: true,
					width: 200,
					minWidth: 100,
					header: {
						content: displayOptions.rowProp.toUpperCase()
					}
				}
			}
		};

		setTimeout(() => {
			// GSTC Config
			// if exists, setting this.config to null will undraw current and need to push the redraw logic to the back of the event queue
			this.config = {
				height: this.viewDimensions.height - 48,
				list: {
					rows,
					columns,
					rowHeight: 30
				},
				chart: {
					items,
					time: {
						period: this.period || 'month',
						additionalSpaces: {
							hour: { before: 24, after: 24, period: 'hour' },
							day: { before: 1, after: 1, period: 'month' },
							week: { before: 1, after: 1, period: 'week' },
							month: { before: 6, after: 6, period: 'month' },
							year: { before: 12, after: 12, period: 'year' }
						}
					}
				},
				actions: {
					'chart-timeline-items-row-item': [this.clickAction.bind(this)]
				},
				plugins: [
					CalendarScroll(
						{
							speed: 1,
							hideScroll: false,
							onChange(time) {
								// console.log(time);
							}
						},
						WeekendHighlight({
							weekdays: [6, 0], // Saturday, Sunday
							className: 'weekend-highlight'
						})
					)
				]
			};
		});
	}

	onState(state) {
		this.gstcState = state;

		// this.gstcState.subscribe('config.list.rows', (rows) => {
		// console.log('rows changed', rows);
		// });

		this.gstcState.subscribe(
			'config.chart.items.:id',
			(bulk, eventInfo) => {
				if (eventInfo.type === 'update' && eventInfo.params.id) {
					const itemId = eventInfo.params.id;
					console.log(
						`item ${itemId} changed`,
						this.gstcState.get('config.chart.items.' + itemId)
					);
				}
			},
			{ bulk: true }
		);

		this.gstcState.subscribe('gstc-loaded', (event) => {
			// this.recenter();
		});

		this.gstcState.subscribe('config.chart.time.zoom', (zoom) => {
			this.zoom = zoom;
		});

		this.gstcState.subscribe('config.chart.time.period', (period) => {
			this.period = period;
		});
	}

	clickAction(element, data) {
		function onClick(event) {
			this.itemClicked.emit(data.item);
		}

		element.addEventListener('click', onClick.bind(this));

		return {
			update(element, newData) {
				data = newData;
			},

			destroy(element, data) {
				element.removeEventListener('click', onClick);
			}
		};
	}

	changePeriod(period: string) {
		const zoom = GSTC.api.setPeriod(period);
	}

	handleZoom(value: number) {
		this.gstcState.update('config.chart.time.zoom', value);
		const period = this.gstcState.get('config.chart.time');
	}

	scrollToToday() {
		console.log(GSTC);
		// GSTC.api.scrollToTime(new Date().getTime());
	}

	isValidDate(d: any) {
		return !isNaN(Date.parse(d));
	}
}
