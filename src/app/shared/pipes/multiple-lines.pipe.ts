import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'multipleLines'})
export class MultipleLinesPipe implements PipeTransform {
    transform(value: string, separator: string): string {        
        let a = value.replace(/\|/g, '\r\n');        
        return a;
    }
}