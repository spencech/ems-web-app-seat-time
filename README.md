# EMS Web Application Components: Seat Time Tracker

The Seat Time Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

This component starts a session timer that pauses after periods of inactivity or when the containg web browser loses focus (e.g., new tab opened, window minimized etc.)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.


## Usage

Add the following element to your Angular.io DOM where you deem appropriate.

	<tracker [time]="0" [interval]="10" [timeout]="300" (tick)="onSeatTimeUpdate($event)"></tracker>

Template attributes with defaults:

	"time": number = 0; // the starting time, in seconds, for the timer
	"interval": number = 10; // the period, in seconds, for broadcast updates from the tracker
	"timeout": number = 300; // allowable amount of inactive time, in seconds, before pausing seat timer

The above configuration starts the seat timer at zero, incrementing it every 10s. After 5 minutes of inactivity (e.g., no mouse movement, keyboard activity etc), the seat timer pauses until activity resumes.

Example component implementation that contains the &lt;tracker/&gt; node shown above in its template.
	
	import { Component } from '@angular/core';
	@Component({
	  selector: 'some-app-component',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class SomeAppComponent {
		constructor() {}
		public onSeatTimeUpdate(time: number) {
			console.log(`updated time: ${time} seconds`);
		}
	}


## Code scaffolding

Run `ng generate component component-name --project SeatTime` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project SeatTime`.
> Note: Don't forget to add `--project SeatTime` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build SeatTime` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build SeatTime`, go to the dist folder `cd dist/seat-time` and run `npm publish`.

## Running unit tests

Run `ng test SeatTime` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
