import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatTimeComponent } from './seat-time.component';

describe('SeatTimeComponent', () => {
  let component: SeatTimeComponent;
  let fixture: ComponentFixture<SeatTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
