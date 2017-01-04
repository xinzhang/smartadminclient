import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DataTableComponent} from './datatable.component';
 
@Component({
  selector: 'button-column',
  template: `<a (click)="buttonClick()"><i class="fa"></i><span>{{text}}</span></a>` 
})
export class ButtonColumnComponent {
	@Input() text;
    @Input() icon;
    
    @Output() buttonClicked = new EventEmitter();

    @Input() rowData;

	constructor(table: DataTableComponent) {
        table.addButtonColumn(this)
  	}

    buttonClick() {
        console.log("button column component clicked.");
        console.log(this.rowData);
        this.buttonClicked.emit(this.rowData);
    }

}