import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColumnComponent} from './column.component';
import {DataTableComponent} from './datatable.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataTableComponent,
    ColumnComponent
  ],
  exports: [
    DataTableComponent, 
    ColumnComponent
  ]
})
export class DataTableModule { }
