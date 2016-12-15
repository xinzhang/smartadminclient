import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',  
  templateUrl: './test.component.html'  
})
export class TestComponent {
    
      passwordstr: string ='';
      confirmPasswordstr: string = '';
      dueDateStr : string = '';

      dueDateChange(event) {
        console.log(event);
        console.log(event.value);
      }
}
