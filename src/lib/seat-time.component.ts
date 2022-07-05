import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() {} 

  ngOnInit() {
    this.initialize();
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

  private onActivity = (event: any) => {
    this.lastActionTime = (new Date).getTime();
    this.startSeatTime();
  }

  private startSeatTime() {
    if(this.seatTimeRunning) return;
    this.seatTimeRunning = true;
    this.seatTimeInterval = window.setInterval(() => this.updateSeatTime(), this.interval * 1000);
  }

  private pauseSeatTime() {
    this.seatTimeRunning = false;
    clearInterval(this.seatTimeInterval);
  }

  private async updateSeatTime() {
    const now = (new Date()).getTime();
    const delta = (now - this.lastActionTime) / 1000;
    if(delta > this.timeout) return this.pauseSeatTime();
    this.time += this.interval;
    this.tick.emit(this.time);
  }  
}
