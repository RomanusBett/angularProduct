import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { EditIcon } from './edit-icon';

describe('EditIcon', () => {
  let component: EditIcon;
  let fixture: ComponentFixture<EditIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIcon],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
