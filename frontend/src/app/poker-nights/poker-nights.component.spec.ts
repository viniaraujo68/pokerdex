import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerNightsComponent } from './poker-nights.component';

describe('PokerNightsComponent', () => {
  let component: PokerNightsComponent;
  let fixture: ComponentFixture<PokerNightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerNightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerNightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
