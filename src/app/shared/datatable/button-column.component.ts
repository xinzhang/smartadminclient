import {Component, Input} from '@angular/core';
import {DataTableComponent} from './datatable.component';
 
@Component({
  selector: 'button-column',
  template: `` 
})
export class ButtonColumnComponent {
	@Input() text;
    @Input() icon;
 
	constructor(table: DataTableComponent) {
        table.addButtonColumn(this)
  	}

}