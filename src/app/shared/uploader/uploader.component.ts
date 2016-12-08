import {Component, OnInit} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

import {FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
const URL = '/api/upload/files';

// webpack html imports
let template = require('./uploader.component.html');

@Component({
  selector: 'simple-demo',
  template: template,
  styles: ['uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  ngOnInit(){
        this.uploader.onCompleteItem = function (fileItem, response, status, headers) {            
            //Get the local filename without generated id.
            let resp = JSON.parse(response);
            if (resp != null) {
              fileItem.alias = resp.Names[0];
            }
            
            console.log('file uploaded ' + localStorage);
        };
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public GetDocuments() : string[] {
    let result : string[] = [];
    this.uploader.queue.forEach( q => {
      if (q.isSuccess && q.isUploaded) {
        result.push( q.alias );
      }
    });

    return result;
  }


}