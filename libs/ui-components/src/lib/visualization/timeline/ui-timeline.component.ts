import { prettyPrint } from './../../../../../utilities/src/lib/utilities/strings/prettyPrint';
import { DatePipe } from '@angular/common';
import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	endOfMonth,
	endOfWeek,
	endOfYear,
	startOfMonth,
	startOfYear,
	subDays,
	subMonths,
	subWeeks,
	subYears
} from 'date-fns';
import { startOfWeek } from 'date-fns/esm';
import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { Subject } from 'rxjs';
import { DataItem, DataSet, Timeline, TimelineOptions } from 'vis-timeline/standalone';

import { pickTextcolorBasedOnBackgroundColor } from '../../../../../utilities/src/lib/utilities/colors/pickTextColorBasedOnBackgroundColor';
import { isDate } from '../../../../../utilities/src/lib/utilities/dates/isDate';
import { UIVisualizationBase, UIVisualizationConfig } from '../ui-visualization.base';
import { UITimelineDisplayOptions } from './ui-timeline.interface';
import { UITimelineService } from './ui-timeline.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ui-vis-timeline',
	templateUrl: './ui-timeline.component.html',
	styleUrls: ['./ui-timeline.component.scss'],
	providers: [UITimelineService],
	encapsulation: ViewEncapsulation.None
})
export class UITimelineComponent extends UIVisualizationBase implements OnInit, OnDestroy {
	@ViewChild('uiTimeline') timelineContainer;

	@Output() timelineZoomMove = new EventEmitter<any>();

	sortControl: FormControl;
	sortBy: 'start' | 'end' | 'label' = 'start';
	sortOptions: SelectItem[] = [
		{ label: 'Start', value: 'start' },
		{ label: 'End', value: 'end' },
		{ label: 'Label', value: 'label' }
	];

	easyRangeOptions: MenuItem[] = [
		{
			label: 'Days',
			items: [
				{ label: 'Next 30', command: () => this.handleEasyRangeChange(30, 'days', 'next') },
				{ label: 'Next 60', command: () => this.handleEasyRangeChange(60, 'days', 'next') },
				{ label: 'Next 90', command: () => this.handleEasyRangeChange(90, 'days', 'next') },
				{
					label: 'Next 180',
					command: () => this.handleEasyRangeChange(180, 'days', 'next')
				},
				{
					label: 'Today',
					command: () => this.handleEasyRangeChange(0, 'days', 'this')
				},
				{
					label: 'Previous 90',
					command: () => this.handleEasyRangeChange(90, 'days', 'prev')
				}
			]
		},
		{
			label: 'Months',
			items: [
				{
					label: 'Previous Month',
					command: () => this.handleEasyRangeChange(1, 'months', 'prev')
				},
				{
					label: 'This Month',
					command: () => this.handleEasyRangeChange(0, 'months', 'this')
				},
				{
					label: 'Next Month',
					command: () => this.handleEasyRangeChange(1, 'months', 'next')
				}
			]
		},
		{
			label: 'Years',
			items: [
				{
					label: 'Previous Year',
					command: () => this.handleEasyRangeChange(1, 'years', 'prev')
				},
				{
					label: 'This Year',
					command: () => this.handleEasyRangeChange(0, 'years', 'this')
				},
				{
					label: 'Next Year',
					command: () => this.handleEasyRangeChange(1, 'years', 'next')
				}
			]
		},
		{
			label: 'Fiscal Years',
			icon: 'pi pi-money-bill',
			items: this.generateFiscalYearOptions()
		}
	];

	private timelineItems: DataSet;
	private timelineGroups: DataSet;
	private timelineOptions: TimelineOptions;
	private timeline: Timeline;

	private timelineCreated$ = new Subject<Timeline>();

	private internalHoveredItem: any;

	constructor(
		public cdRef: ChangeDetectorRef,
		private datePipe: DatePipe,
		private router: Router,
		private route: ActivatedRoute,
		private uiTimelineService: UITimelineService
	) {
		super(cdRef);

		this.configLoaded$.subscribe((config: UIVisualizationConfig) => {
			this.transformTimelineData(config.displayOptions, config.data);
			this.setupTimelineOptions(config.displayOptions);
			setTimeout(() => {
				this.timelineContainer.nativeElement.innerHTML = ``;
				this.createTimeline();
			}, 10);
		});

		this.hoveredItemInternalSet$.subscribe((item) => {
			if (item) {
				this.internalHoveredItem = item;
				this.setItemHighlight(item.id);
			} else {
				if (!this.internalHoveredItem) return;
				this.setItemHighlight(this.internalHoveredItem.id, true);
				this.internalHoveredItem = null;
			}
		});

		this.timelineCreated$.subscribe(() => {
			this.timeline.setOptions({ maxHeight: this.viewDimensions.height - 40 });

			setTimeout(() => {
				if (this.displayOptions.setUrlParameters) {
					const timelineStateParams = this.route.snapshot.queryParamMap.get(
						'timelineState'
					);
					if (timelineStateParams) {
						const timelineState = JSON.parse(timelineStateParams);
						this.setTimelineWindow(
							new Date(timelineState.start),
							new Date(timelineState.end)
						);
					}
				}
			});
		});

		this.sortControl = new FormControl(this.sortBy);
		this.sortControl.valueChanges.subscribe((value) => {
			this.sortBy = value;
			this.handleSortChange(this.sortBy);
		});
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		if (this.timelineCreated$) {
			this.timelineCreated$.unsubscribe();
		}
	}

	/**
	 * TIMELINE SETUP
	 */
	private createTimeline() {
		this.timeline = new Timeline(
			this.timelineContainer.nativeElement,
			this.timelineItems,
			this.timelineGroups,
			this.timelineOptions
		);

		this.attachEventsToTimeline();

		this.timelineCreated$.next(this.timeline);
	}

	private attachEventsToTimeline() {
		this.timeline.on('select', (props) => {
			if (props.items && props.items.length) {
				const fullItem = this.data.find((d) => d.id === props.items[0]);
				this.itemClicked.emit(fullItem);
			}
		});

		this.timeline.on('itemover', (props) => {
			this.internalHoveredItem = this.data.find((d) => d.id === props.item);
			this.itemHovered.emit(this.internalHoveredItem);
			this.setItemHighlight(props.item, false);
		});

		this.timeline.on('itemout', (props) => {
			this.internalHoveredItem = null;
			this.itemHovered.emit(this.internalHoveredItem);
			this.setItemHighlight(props.item, true);
		});

		this.timeline.on(
			'rangechanged',
			(props: { start: number; end: number; byUser: boolean; event: any }) => {
				// if (props.byUser) {
				this.emitZoomMoveParameters(props);
				// }
			}
		);
	}

	private transformTimelineData(displayOptions: UITimelineDisplayOptions, data: any[]) {
		this.createGroups(data, displayOptions.rowProp, displayOptions.subRowProp);

		const transformedItems = (data || [])
			.filter((d) => {
				// No date, don't include this item
				return (
					d[displayOptions.startProp] &&
					isDate(d[displayOptions.startProp]) &&
					d[displayOptions.endProp] &&
					isDate(d[displayOptions.endProp])
				);
			})
			.map((d) => {
				const groupId = this.generateGroupIdForItem(
					d,
					displayOptions.rowProp,
					displayOptions.subRowProp
				);

				const itemColor = this.getColorForItem(
					d,
					displayOptions.dataDrivenColorMap,
					displayOptions.rowProp,
					displayOptions.subRowProp
				);

				return {
					...d,
					id: d.id,
					// id: `${groupId}${d.id ? '_' + d.id : ''}`,
					content: `
						<div 
							class="item-content"
							id="ui_timeline_${d.id}"
						>
							${d[displayOptions.labelProp]}
						</div>
					`,
					start: d[displayOptions.startProp],
					end: d[displayOptions.endProp],
					title: this.generateTooltipForItem(d, displayOptions),
					style: `background-color:${itemColor.bgColor};color:${itemColor.fgColor};`,
					type: 'range',
					group: groupId
				};
			});
		this.timelineItems = new DataSet(transformedItems);
	}

	private createGroups(data, rowProp, subRowProp?) {
		this.timelineGroups = new DataSet();

		const rows = [];
		const uniqueRows = new Set<String>();

		(data || []).forEach((d) => uniqueRows.add(d[rowProp] ? d[rowProp].trim() : ''));
		Array.from(uniqueRows).forEach((row: string, index: number) => {
			const subRows = [];
			const uniqueSubRows = new Set<String>();

			if (subRowProp) {
				(data || [])
					.filter((d) => d[rowProp] === row)
					.forEach((d) => {
						uniqueSubRows.add(d[subRowProp] ? d[subRowProp].trim() : '');
					});

				Array.from(uniqueSubRows).forEach((subRow: string, index: number) => {
					subRows.push({
						id: `${row}_${subRow}`,
						content: `${subRow}`,
						treeLevel: 1
					});
				});

				this.timelineGroups.add(subRows);
			}

			rows.push({
				id: row || '',
				content: `${row}`,
				nestedGroups: subRows.map((subRow) => subRow.id)
			});
		});

		this.timelineGroups.add(rows);
	}

	private generateGroupIdForItem(item: any, rowProp: string, subRowProp?: string) {
		if (subRowProp) {
			return `${item[rowProp]}_${item[subRowProp]}`;
		} else {
			return `${item[rowProp]}`;
		}
	}

	private generateTooltipForItem(item: any, displayOptions: UITimelineDisplayOptions) {
		const label = item[displayOptions.labelProp] || '',
			startDate = this.datePipe.transform(new Date(item[displayOptions.startProp]), 'short'),
			endDate = this.datePipe.transform(new Date(item[displayOptions.endProp]), 'short'),
			row = item[displayOptions.rowProp],
			subRow = item[displayOptions.subRowProp];

		let tooltipHTML = `<div 
				class="d-flex justify-content-center flex-column" 
				style="max-width:350px !important;"
			>
				<h4 class="w-100 border-bottom">${label}</h4>
		`;
		if (displayOptions.tooltipProps?.length) {
			displayOptions.tooltipProps.forEach((ttProp) => {
				const propVal = item[ttProp] || '~NONE~';
				tooltipHTML += `<h6><i>${prettyPrint(ttProp)}</i>: ${
					isDate(propVal) ? this.datePipe.transform(new Date(propVal), 'short') : propVal
				}</h6>`;
			});
		} else {
			tooltipHTML += `<h6><i>Start Date</i>: ${startDate}</h6>
				   <h6><i>End Date</i>: ${endDate}</h6>
				   <h6><i>Group</i>: ${row}</h6>
				   <h6><i>Sub-Group</i>: ${subRow}</h6>`;
		}
		tooltipHTML += `</div>`;

		return tooltipHTML;
	}

	private getColorForItem(
		item: any,
		colorMap: any,
		rowProp: string,
		subRowProp?: string
	): { bgColor: string; fgColor: string } {
		const rowValue = (item[rowProp] || '').trim(),
			subRowValue = (item[subRowProp] || '').trim();

		let bgColor = '#363636';

		if (colorMap[rowProp] && colorMap[rowProp][rowValue]) {
			bgColor = colorMap[rowProp][rowValue].color;
		} else if (subRowProp && colorMap[subRowProp] && colorMap[subRowProp][subRowValue]) {
			bgColor = colorMap[subRowProp][subRowValue].color;
		}

		return {
			bgColor,
			fgColor: pickTextcolorBasedOnBackgroundColor(bgColor)
		};
	}

	private setupTimelineOptions(displayOptions: UITimelineDisplayOptions) {
		this.timelineOptions = {
			order: this.sortItemsByStart,
			groupOrder: (a, b) => (a.content === b.content ? 0 : a.content > b.content ? 1 : -1),

			// start: subDays(new Date(), 30),

			verticalScroll: true,

			orientation: 'top',
			showWeekScale: true,

			zoomKey: 'ctrlKey',

			tooltip: {
				followMouse: false
			}
		};
	}

	private sortItemsByStart(a: DataItem, b: DataItem) {
		const aDate = new Date(a.start),
			bDate = new Date(b.start),
			equalDates = aDate === bDate,
			aDateNewer = aDate > bDate,
			equalContent = a.content === b.content,
			aContentAfter = a.content > b.content;
		return equalDates ? (equalContent ? 0 : aContentAfter ? 1 : 1) : aDateNewer ? 1 : -1;
	}

	private sortItemsByEnd(a: DataItem, b: DataItem) {
		const aDate = new Date(a.end),
			bDate = new Date(b.end),
			equalDates = aDate === bDate,
			aDateNewer = aDate > bDate,
			equalContent = a.content === b.content,
			aContentAfter = a.content > b.content;
		return equalDates ? (equalContent ? 0 : aContentAfter ? 1 : 1) : aDateNewer ? 1 : -1;
	}

	private sortItemsByContent(a: DataItem, b: DataItem) {
		return a.content === b.content ? 0 : a.content > b.content ? 1 : -1;
	}

	private generateFiscalYearOptions(): MenuItem[] {
		const currentYear = new Date().getFullYear();
		const fiscalOptions: MenuItem[] = [];

		for (let fy = currentYear - 1; fy <= currentYear + 10; fy++) {
			const fiscalQuarters: MenuItem[] = [
				{
					label: 'All',
					command: () => {
						this.handleEasyRangeChange(fy, 'fiscalYears', 'this');
					}
				}
			];
			for (let qtr = 1; qtr <= 4; qtr++) {
				fiscalQuarters.push({
					label: `QTR${qtr}`,
					command: () => {
						this.handleEasyRangeChange(`${fy}-${qtr}`, 'fiscalYears', 'this');
					}
				});
			}

			fiscalOptions.push({
				label: `FY${fy}`,
				items: fiscalQuarters
			});
		}

		return fiscalOptions;
	}

	/**
	 * EVENTS
	 */
	handleSortChange(sortBy) {
		let sortFn = this.sortItemsByStart;
		if (sortBy === 'start') {
			sortFn = this.sortItemsByStart;
		} else if (sortBy === 'end') {
			sortFn = this.sortItemsByEnd;
		} else if (sortBy === 'label') {
			sortFn = this.sortItemsByContent;
		}

		this.timeline.setOptions({
			order: sortFn
		});
	}

	handleEasyRangeChange(
		value,
		period: 'days' | 'weeks' | 'months' | 'years' | 'fiscalYears' = 'days',
		direction: 'prev' | 'next' | 'this' = 'this'
	) {
		const today = new Date();
		let startDate, endDate;

		switch (period) {
			case 'days':
				if (direction === 'prev') {
					(startDate = subDays(today, value)), (endDate = addDays(today, 1));
				} else if (direction === 'next') {
					(startDate = subDays(today, 1)), (endDate = addDays(today, value));
				} else {
					(startDate = subDays(today, 1)), (endDate = addDays(today, 1));
				}
				break;
			case 'weeks':
				let weekToUse = today;
				if (direction === 'prev') {
					weekToUse = subWeeks(today, 1);
				} else if (direction === 'next') {
					weekToUse = addWeeks(today, 1);
				}
				(startDate = startOfWeek(weekToUse)), (endDate = endOfWeek(weekToUse));
				break;
			case 'months':
				let monthToUse = today;
				if (direction === 'prev') {
					monthToUse = subMonths(today, 1);
				} else if (direction === 'next') {
					monthToUse = addMonths(today, 1);
				}
				(startDate = startOfMonth(monthToUse)), (endDate = endOfMonth(monthToUse));
				break;
			case 'years':
				let yearToUse = today;
				if (direction === 'prev') {
					yearToUse = subYears(today, 1);
				} else if (direction === 'next') {
					yearToUse = addYears(today, 1);
				}
				(startDate = startOfYear(yearToUse)), (endDate = endOfYear(yearToUse));
				break;
			case 'fiscalYears':
				const yearStart = startOfYear(new Date(`${value}`));
				(startDate = subMonths(yearStart, 3)), (endDate = addMonths(yearStart, 9));

				if (value.indexOf && value.indexOf('-') >= 0) {
					// FY QTRs
					const fiscalQuarter = value.split('-')[1];

					switch (fiscalQuarter) {
						case '1':
							startDate = startOfMonth(subMonths(yearStart, 3));
							endDate = endOfMonth(subMonths(yearStart, 1));
							break;
						case '2':
							startDate = startOfMonth(addMonths(yearStart, 0));
							endDate = endOfMonth(addMonths(yearStart, 2));
							break;
						case '3':
							startDate = startOfMonth(addMonths(yearStart, 3));
							endDate = endOfMonth(addMonths(yearStart, 5));
							break;
						case '4':
							startDate = startOfMonth(addMonths(yearStart, 6));
							endDate = endOfMonth(addMonths(yearStart, 8));
							break;
					}
				}
				break;
		}

		this.setTimelineWindow(startDate, endDate);
		this.emitZoomMoveParameters({ start: startDate, end: endDate });
	}

	scrollToToday() {
		this.moveTimelineTo(new Date());
	}

	fitTimeline() {
		this.timeline.fit();
	}

	moveTimelineTo(date: Date) {
		this.timeline.moveTo(date);
	}

	setTimelineWindow(startDate: Date, endDate: Date) {
		this.timeline.setWindow(startDate, endDate);
	}

	moveTimeline(percentage) {
		const range: any = this.timeline.getWindow();
		const interval = range.end - range.start;

		const moveObj = {
			start: range.start.valueOf() - interval * percentage,
			end: range.end.valueOf() - interval * percentage
		};

		this.timeline.setWindow(moveObj.start, moveObj.end);
	}

	zoomTimeline(percentage, zoomDirection: 'in' | 'out' = 'out') {
		if (zoomDirection === 'out') {
			this.timeline.zoomOut(percentage);
		} else {
			this.timeline.zoomIn(percentage);
		}
	}

	private setItemHighlight(id, remove?: boolean) {
		const itemEl = document.getElementById(`ui_timeline_${id}`);
		if (!itemEl) return;
		const parentEl = <HTMLElement>itemEl.parentNode.parentNode.parentNode;
		if (remove) {
			parentEl.classList.remove('vis-selected');
		} else {
			parentEl.classList.add('vis-selected');
		}
	}

	private emitZoomMoveParameters(event: {
		start: number;
		end: number;
		byUser?: boolean;
		event?: any;
	}) {
		const updatedState = { start: event.start, end: event.end };
		this.timelineZoomMove.emit(updatedState);
		if (this.displayOptions.setUrlParameters) {
			this.router.navigate([], {
				queryParams: {
					timelineState: JSON.stringify(updatedState)
				},
				queryParamsHandling: 'merge'
			});
		}
	}
}
