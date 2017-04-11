import {Http, Response} from '@angular/http';
import {Injectable, Component, Input} from '@angular/core';
import {ColumnComponent} from './column.component';
 
@Component({
  selector: 'datatable',
  template: `<table>
               <thead>
                 <tr>
                   <th *ngFor="let column of columns">{{column.header}}</th>
                 </tr>
               </thead>
	       <tbody *ngFor="let row of dataset">
	  	 <tr>
	  	   <td *ngFor="let column of columns">{{row[column.value]}}</td>
	         </tr>
	       </tbody>
  	     </table>
  `
})
export class DataTableComponent { 
 
  @Input() dataset;
  columns: ColumnComponent[] = [];
 
  addColumn(column){
    this.columns.push(column);
  }
  
}