import {TestBed, async} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {TransferDetailComponent} from './transfer-detail.component';

describe('Component: Greeter', () => {
  let fixture, greeter, element, de;
  
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TransferDetailComponent ]
    });

    fixture = TestBed.createComponent(TransferDetailComponent);
    greeter = fixture.componentInstance;  // to access properties and methods
    element = fixture.nativeElement;      // to access DOM element
    de = fixture.debugElement;            // test helper
  });
  
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(TransferDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  //specs
  // it('should render `details`', async(() => {
  //   //greeter.transferDetail = new TransferDetailModel("","");
  //   const fixture = TestBed.createComponent(TransferDetailComponent);
  //   //trigger change detection
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => { 
  //     expect(element.querySelector('div').innerText).toBe('Hello World!');      
  //   });
  // }));

}) 