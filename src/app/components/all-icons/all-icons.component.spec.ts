import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIconsComponent } from './all-icons.component';

describe('AllIconsComponent', () => {
  let component: AllIconsComponent;
  let fixture: ComponentFixture<AllIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
