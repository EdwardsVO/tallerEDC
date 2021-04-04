import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filterAll'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterUser: any): any {
    if(!filterUser) {
      return value
    }
      return value.filter((data) => this.matchValue(data,filterUser));

  }
    matchValue(data, value) {
      return Object.keys(data).map((key) => {
        return new RegExp(value, 'gi').test(data[key]);
      }).some(result => result);
    }
}
