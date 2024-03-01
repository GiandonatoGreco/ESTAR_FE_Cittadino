import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight: string = 'gold';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'unset';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor(this.appHighlight);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor('unset');
  }

  changeColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
