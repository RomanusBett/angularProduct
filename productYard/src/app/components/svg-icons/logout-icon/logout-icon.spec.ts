import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LogoutIcon } from './logout-icon';

describe('LogoutIcon', () => {
  let component: LogoutIcon;
  let fixture: ComponentFixture<LogoutIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutIcon],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
