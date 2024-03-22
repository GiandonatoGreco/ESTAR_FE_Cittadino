import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { formatSize } from '../../../utils/documents';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  @Input() acceptedFormats: string[] = [];
  @Input() maxSize?: number;

  formData = new FormData();
  file?: File;
  fileStr: string = '';
  errorMsg?: string;

  clickInput() {
    this.inputFile.nativeElement.click();
  }

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Resolve with the file content when the reader is done
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        // Reject with the error if there is any
        reject(reader.error);
      };

      reader.readAsDataURL(file);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        this.errorMsg = 'Il file ha dimensioni troppo elevate.';
      } else {
        this.errorMsg = undefined;
        this.file = file;
        this.formData.append('file', file);
        this.readFile(file).then((content) => {
          // Do something with the file content
          this.fileStr = content;
        });
      }
    }
  }

  formatFile() {
    if (this.file?.size) {
      return `${this.file?.name} (${formatSize(this.file.size)})`;
    }
    return `${this.file?.name} `;
  }

  removeFile() {
    this.file = undefined;
  }
}
