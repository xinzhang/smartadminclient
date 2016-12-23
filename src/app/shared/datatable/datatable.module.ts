import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColumnComponent} from './column.component';
import {ExpandColumnComponent} from './expand-column.component';
import {ButtonColumnComponent} from './button-column.component';
import {DataTableComponent} from './datatable.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataTableComponent,
    ColumnComponent,
    ExpandColumnComponent,
    ButtonColumnComponent
  ],
  exports: [
    DataTableComponent, 
    ColumnComponent,
    ExpandColumnComponent,
    ButtonColumnComponent
  ]
})
export class DataTableModule { }
