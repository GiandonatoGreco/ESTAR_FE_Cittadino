import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeDoctorComponent } from './modal-change-doctor.component';

describe('ModalChangeDoctorComponent', () => {
  let component: ModalChangeDoctorComponent;
  let fixture: ComponentFixture<ModalChangeDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalChangeDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalChangeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
