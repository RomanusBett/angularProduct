import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardCard } from './yard-card';

describe('YardCard', () => {
  let component: YardCard;
  let fixture: ComponentFixture<YardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardCard]
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
