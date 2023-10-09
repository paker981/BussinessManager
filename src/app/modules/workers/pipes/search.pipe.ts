import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { University } from 'src/app/interfaces/university.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: University[], filter: string): University[] {
    if (!items || filter.length < 1) {
        return items;
    }
    
    return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }
}
