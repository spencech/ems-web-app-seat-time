import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SeatTimeService } from "./seat-time.service";
import { SeatTimeStateChange } from "./seat-time.classes";


@Component({
  selector: 'tracker',
  template: '<div id=tracker></div>'
})
export class SeatTimeComponent implements OnInit, OnDestroy {
  @Input("time") time: number = 0;
  @Input("interval") interval: number = 10;
  @Input("timeout") timeout: number = 300;
  @Output("tick") tick:EventEmitter<number> = new EventEmitter();

  private seatTimeRunning: boolean = false;
  private seatTimeInterval: number = 0;
  private lastActionTime: number = 0;
  private programmaticPause: boolean = false;

  constructor(private service: SeatTimeService) {} 

  ngOnInit() {
    this.initialize();
    this.service.state.subscribe(this.onStateChangeRequest);
  }

  ngOnDestroy() {
    clearInterval(this.seatTimeInterval);
  }

  private async initialize() {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event: string) => {
      document.addEventListener(event, this.onActivity, true);
    });

    window.onfocus = (event:any) => this.onWindowFocus(event);
    window.onblur =  (event:any) => this.onWindowBlur(event);
    this.startSeatTime();
  }

  private onWindowFocus = (event:any) => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach((event: string) => {
      document.addEventListener(event, this.onActivity, true);
    });

    this.onActivity(event);
  }

  private onWindowBlur = (event:any) => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event: string) => {
      document.removeEventListener(event, this.onActivity, true);
    });
    this.pauseSeatTime();
  }

  private onActivity = (event?: any) => {
    this.lastActionTime = (new Date).getTime();
    this.startSeatTime();
  }

  private startSeatTime() {
    if(this.seatTimeRunning || this.programmaticPause) return;
    this.seatTimeRunning = true;
    this.seatTimeInterval = window.setInterval(() => this.updateSeatTime(), this.interval * 1000);
  }

  private pauseSeatTime() {
    this.seatTimeRunning = false;
    clearInterval(this.seatTimeInterval);
  }

  private updateSeatTime() {
    const now = (new Date()).getTime();
    const delta = (now - this.lastActionTime) / 1000;
    if(delta > this.timeout) return this.pauseSeatTime();
    this.time += this.interval;
    this.tick.emit(this.time);
  }  

  private onStateChangeRequest(state: SeatTimeStateChange | null) {
    switch(state) {
      case SeatTimeStateChange.Pause:
          this.programmaticPause = true;
          this.lastActionTime = (new Date).getTime();
          this.pauseSeatTime();
      break;
      case SeatTimeStateChange.Resume:
          this.programmaticPause = false;
          this.onActivity();
      break;
      case SeatTimeStateChange.ResetAndPause:
          this.time = 0;
          this.programmaticPause = true;
          this.pauseSeatTime();
      break;
      case SeatTimeStateChange.ResetAndResume:
          this.time = 0;
          this.pauseSeatTime();
          this.programmaticPause = false;
          this.onActivity();
      break;
      default:
    }
  }
}
