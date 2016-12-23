import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DataTableComponent} from './datatable.component';
 
@Component({
  selector: 'button-column',
  template: `` 
})
export class ButtonColumnComponent {
	@Input() text;
    @Input() icon;
    
    @Output() buttonClicked = new EventEmitter();

	constructor(table: DataTableComponent) {
        table.addButtonColumn(this)
  	}

    buttonClick() {
        this.buttonClicked.emit();
    }
    
}