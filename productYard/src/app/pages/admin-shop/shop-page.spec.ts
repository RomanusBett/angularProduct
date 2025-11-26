import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ShopPage } from './shop-page';
import { provideHttpClient } from '@angular/common/http';


describe('ShopPage', () => {
  let component: ShopPage;
  let fixture: ComponentFixture<ShopPage>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPage, ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(), provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the create modal', () => {
    expect(component.showCreateModal).toBe(false);
    component.toggleCreateModal();
    expect(component.showCreateModal).toBe(true);
    component.closeCreateModal();
    expect(component.showCreateModal).toBe(false);
  });
});

