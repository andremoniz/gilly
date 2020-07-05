import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'landing-page',
	template: `
		<div>
			<button>New Game</button>

			<h4>Past Results</h4>
			<table>
				<thead>
					<tr>
						<th>Winner</th>
						<th># of Wins</th>
						<th>Date of Win</th>
					</tr>
				</thead>
			</table>
		</div>
	`,
	styles: [``]
})
export class GameLandingPageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
