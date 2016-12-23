import { Http, Response } from '@angular/http';
import { Injectable, Component, Input } from '@angular/core';
import { ColumnComponent } from './column.component';
import { ExpandColumnComponent } from './expand-column.component';
import { ButtonColumnComponent } from './button-column.component';

@Component({
    selector: 'datatable',
    template: `<div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th *ngIf="expandColumn"></th>
                                <th *ngFor="let column of columns">{{column.header}}</th>
                                <th *ngIf="buttonColumn"></th>
                            </tr>
                        </thead>
                        <tbody *ngFor="let row of dataset">
                            <tr>
                                <td *ngIf="expandColumn">                                
                                    <a (click)="expandColumn.expand()"><i class="fa fa-plus" ></i> <span>{{expandColumn.text}}</span></a>
                                </td>
                                <td *ngFor="let column of columns">
                                    {{row[column.value]}}
                                </td>
                                <td *ngIf="buttonColumn">
                                    <button-column [text]="'Detail'" [icon]="'fa-eye'" (buttonClicked)="onDetailClicked()" [rowData]="row"></button-column>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>`
})
export class DataTableComponent {

    @Input() dataset;
    columns: ColumnComponent[] = [];
    expandColumn: ExpandColumnComponent;
    buttonColumn: ButtonColumnComponent;

    addColumn(column) {
        this.columns.push(column);
    }

    addExpandColumn(expandColumn) {
        this.expandColumn = expandColumn;
    }

    addButtonColumn(buttonColumn) {
        this.buttonColumn = buttonColumn;
    }
}