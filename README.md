# EMS Web Application Components: Seat Time Tracker

The Seat Time Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

Find the [web application template source code on GitHub](https://github.com/spencech/ems-web-app-template) to review implementation in context.

Find a [working example of this component here](https://ems-web-app.educationalmediasolutions.com).

This component starts a session timer that pauses after periods of inactivity or when the containing web browser loses focus (e.g., new tab opened, window minimized etc.)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.


## Usage

Module Implementation

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { AppComponent } from './app.component';
	import { SeatTimeModule } from "ems-web-app-seat-time";

	@NgModule({
	  declarations: [
	    AppComponent 
	  ],
	  imports: [
	    BrowserModule,
	    SeatTimeModule 
	  ],
	  providers: [],
	  bootstrap: [ AppComponent ]
	})
	export class AppModule { }

Add the following element to your Angular.io DOM where you deem appropriate.

	<tracker [time]="0" [interval]="10" [timeout]="300" (tick)="onSeatTimeUpdate($event)"></tracker>

Template attributes with defaults:

	"time": number = 0; // the starting time, in seconds, for the timer
	"interval": number = 10; // the period, in seconds, for broadcast updates from the tracker
	"timeout": number = 300; // allowable amount of inactive time, in seconds, before pausing seat timer

The above configuration starts the seat timer at zero, incrementing it every 10s. After 5 minutes of inactivity (e.g., no mouse movement, keyboard activity etc), the seat timer pauses until activity resumes.

Example component implementation that contains the &lt;tracker/&gt; node shown above in its template.
	
	import { Component } from '@angular/core';
	import { SeatTimeService, SeatTimeStateChange } from "ems-web-app-seat-time";

	@Component({
	  selector: 'some-app-component',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class SomeAppComponent {
		
		constructor(private seatTime: SeatTimeService) {}
		
		public onSeatTimeUpdate(time: number) {
			console.log(`updated time: ${time} seconds`);
		}

		//when paused, user activity will no longer restart the counter
		//you must trigger a resume state change with one of the methods below
		public pauseTimerIndefinitely() {
			this.seatTime.updateState(SeatTimeStateChange.Pause);
		}

		//when paused, user activity will no longer restart the counter
		//you must trigger a resume state change with one of the methods below
		public resetTimerToZeroAndProgrammaticallyPause() {
			this.seatTime.updateState(SeatTimeStateChange.ResetAndPause);
		}

		public resumeTimerFromProgrammaticPause() {
			this.seatTime.updateState(SeatTimeStateChange.Resume);
		}

		public resetTimerToZeroAndResume() {
			this.seatTime.updateState(SeatTimeStateChange.ResetAndResume);
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
