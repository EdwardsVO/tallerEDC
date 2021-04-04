import { Directive, ElementRef, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private elementImg: ElementRef) { }
  @HostListener('error')
  onError():void{
    this.elementImg.nativeElement.src = environment.defaultImgURL;
  }
}
