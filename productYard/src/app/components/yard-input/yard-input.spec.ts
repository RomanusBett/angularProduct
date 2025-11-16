import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardInput } from './yard-input';

describe('YardInput', () => {
  let component: YardInput;
  let fixture: ComponentFixture<YardInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YardInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
