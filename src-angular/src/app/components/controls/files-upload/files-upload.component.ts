import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Toast } from '../../../../services/toast.service';

@Component({
  selector: 'app-files-upload',
  imports: [
    FileUpload,
    ButtonModule,
    CommonModule,

    TranslateModule
  ],
  templateUrl: './files-upload.component.html',
  styleUrl: './files-upload.component.scss'
})
export class FilesUploadComponent {

  constructor(
    private readonly config: PrimeNG,
    private readonly toast: Toast,
    private readonly translate: TranslateService,
  ) {}

  @Output() filesUpdate = new EventEmitter<File[]>() 
  
  @ViewChild(FileUpload) fileUpload!: FileUpload

  files: File[] = [];

  onSelectedFiles(event: FileSelectEvent) {
    const selectedFiles = event.currentFiles
    if (selectedFiles.length > 5) {
      this.toast.error(this.translate.instant('form.attachments.max'))
      this.fileUpload.clear()
      this.setFiles([])
      return
    }
    this.setFiles(selectedFiles)
  }

  choose(event: MouseEvent, callback: () => {}) {
    callback()
  }
  
  clear(event: MouseEvent, callback: () => {}) {
    callback()
    this.setFiles([])
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (!sizes) {
      throw new Error(`sizes: ${sizes}`)
    }
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  onRemoveTemplatingFile(event: MouseEvent, file: File, removeFileCallback: (event: MouseEvent, index: number) => {}, index: number) {
    removeFileCallback(event, index);
    this.setFiles(this.files)
  }

  private setFiles(files: File[]) {
    this.files = files
    this.filesUpdate.emit(this.files)
  }

}
