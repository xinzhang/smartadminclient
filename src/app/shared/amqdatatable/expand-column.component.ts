import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DataTableComponent} from './datatable.component';
 
@Component({
  selector: 'expand-column',
  template: ``
})
export class ExpandColumnComponent {
	 @Input() text;
	 @Output() expanded = new EventEmitter();

     title: string;
 
	constructor(table: DataTableComponent) {
    	   table.addExpandColumn(this)
  	}
    
    expand() {
        this.expanded.emit();
    }
    
}