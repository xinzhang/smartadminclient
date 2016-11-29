import {Component} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

// webpack html imports
let template = require('./uploader.component.html');

@Component({
  selector: 'simple-demo',
  template: template,
  styles: ['uploader.component.css']
})
export class UploaderComponent {
  public uploader:FileUploader = new FileUploader({url: URL});

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}