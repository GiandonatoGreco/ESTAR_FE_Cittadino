import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocumentUploadComponent } from './modal-document-upload.component';

describe('ModalDocumentUploadComponent', () => {
  let component: ModalDocumentUploadComponent;
  let fixture: ComponentFixture<ModalDocumentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDocumentUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDocumentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
