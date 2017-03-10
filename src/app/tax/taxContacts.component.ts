import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaxContact } from '../models/taxContact.model';

@Component({
    selector: 'tax-contacts',
    templateUrl: './taxContacts.component.html'
})
export class TaxContactsComponent implements OnInit {
    @Input()
    taxContacts: TaxContact[] = [];

    @Output()
    saveContactDetail = new EventEmitter();

    isEditing = false;
    isEditingLine = -1;
    currentTaxContact: TaxContact;

    constructor() {
    }

    ngOnInit(): void {
    }
    
    saveDetail(rowIndex: number) {        
        this.taxContacts[rowIndex] = this.currentTaxContact;
        this.saveContactDetail.emit({
            value:this.taxContacts
        });
        this.isEditing = false;     
        this.isEditingLine = -1;           
    }

    editDetail(rowIndex: number) {
        this.isEditing = true;
        this.isEditingLine = rowIndex;
        this.currentTaxContact = this.taxContacts[rowIndex];
    }

    cancel(rowIndex: number) {
        this.isEditing = false;     
        this.isEditingLine = -1;   
    }

}