import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: any,  args: any): any {
    const resultCar = [];
    for(const car of value){
      if(car.ownerName.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultCar.push(car);
      }
      if(car.model.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultCar.push(car);
      }
      if(car.brand.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultCar.push(car);
      }
      if(car.plate.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultCar.push(car);
      }
      if(car.appointmentDate.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultCar.push(car);
      }

    }
    return resultCar;
  }
}
