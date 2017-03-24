import {Directive, ElementRef, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[summernote]'  
})
export class SummernoteDirective implements OnInit{

  @Input() summernote = {};
  @Input() codeText = "";
  @Output() codeChange = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngOnInit(){
    System.import('script!summernote/dist/summernote.min.js').then(()=>{
      this.render()
    })
  }

  render(){
      $(this.el.nativeElement).summernote(Object.assign(this.summernote, {
        focus : true,
        tabsize : 2,
        callbacks: {
          onChange: (we, contents, $editable) => {
            this.codeChange.emit({
              value: we
            });
          }
        }        
      }));     

      if (this.codeText != null && this.codeText !== '') {
        $(this.el.nativeElement).summernote('editor.pasteHTML', this.codeText);      
      }
  }

  public refreshText() {
    if (this.codeText != null && this.codeText !== '') {
      $(this.el.nativeElement).summernote('editor.pasteHTML', this.codeText);
    }
  }
   
}
