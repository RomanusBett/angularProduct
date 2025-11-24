import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { YardCard } from './yard-card';

describe('YardCard', () => {
  let component: YardCard;
  let fixture: ComponentFixture<YardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YardCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
