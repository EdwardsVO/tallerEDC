import { Directive, ElementRef, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private elementImg: ElementRef) { }
  @HostListener('error')
  onError():void{
    this.elementImg.nativeElement.src = 'https://firebasestorage.googleapis.com/v0/b/talleredc-8704c.appspot.com/o/page%2Fplaceholder%2Fplaceholder.jpg?alt=media&token=5f69c8f2-d262-4985-a83e-e968dbc2d750';
  }
}
