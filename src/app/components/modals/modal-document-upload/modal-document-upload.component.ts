import { Component, ViewChild } from '@angular/core';
import { FileUploaderComponent } from 'components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-modal-document-upload',
  templateUrl: './modal-document-upload.component.html',
  styleUrl: './modal-document-upload.component.scss',
})
export class ModalDocumentUploadComponent {
  @ViewChild(FileUploaderComponent) fileUploader!: FileUploaderComponent;

  description: string = '';
  acceptedFormats = ['.pdf', 'image/*'];

  constructor() {}

  isValidForm() {
    return this.description.length > 0 && this.fileUploader.file;
  }

  uploadDocument() {
    const body = {
      description: this.description,
      file: this.fileUploader.file,
      fileStr: this.fileUploader.fileStr,
    };
    // TODO upload api call & format body --> formaData or base64
    console.log('body', body);
    // clear modal
    this.description = '';
    this.fileUploader.file = undefined;
  }
}
