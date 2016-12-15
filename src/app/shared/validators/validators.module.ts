import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DueDateValidator } from './duedate-validator.directive'
import { EqualValidator } from './equal-validator.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DueDateValidator, EqualValidator
  ],
  exports: [
    DueDateValidator, EqualValidator
  ]
})
export class ValidatorsModule { }
