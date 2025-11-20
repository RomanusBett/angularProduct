import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { RoundButton } from './round-button';

describe('RoundButton', () => {
  let component: RoundButton;
  let fixture: ComponentFixture<RoundButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
