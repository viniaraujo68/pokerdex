import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerNightFormComponent } from './poker-night-form.component';

describe('PokerNightFormComponent', () => {
  let component: PokerNightFormComponent;
  let fixture: ComponentFixture<PokerNightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerNightFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerNightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
