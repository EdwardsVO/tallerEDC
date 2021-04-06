import { Directive, ElementRef, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private elementImg: ElementRef) { }
  @HostListener('error')
  onError():void{
    this.elementImg.nativeElement.src = 'https://firebasestorage.googleapis.com/v0/b/talleredc-8704c.appspot.com/o/images%2Fplaceholder.jpg?alt=media&token=68871d28-fd48-4a95-a8c7-8bf32680dc95';
  }
}
