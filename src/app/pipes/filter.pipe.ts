import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,  args: any): any {
    const resultUser = [];
    for(const user of value){
      if(user.name.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultUser.push(user);
      }
      if(user.email.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultUser.push(user);
      }
      if(user.role.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resultUser.push(user);
      }
    }
    return resultUser;
  }

}
