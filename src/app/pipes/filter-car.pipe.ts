import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: any, filterCar: any): any {
    if(!filterCar) {
      return value
    }
      return value.filter((data) => this.matchValue(data,filterCar));

  }
    matchValue(data, value) {
      return Object.keys(data).map((key) => {
        return new RegExp(value, 'gi').test(data[key]);
      }).some(result => result);
    }
}
