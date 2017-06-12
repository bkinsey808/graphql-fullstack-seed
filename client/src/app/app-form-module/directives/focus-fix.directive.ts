import { Directive, AfterViewInit, ElementRef } from '@angular/core'

@Directive({
  selector: '[bkngFocusFix]',
})
export class FocusFixDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const el = this.elementRef.nativeElement.querySelector('[mdInput]')
    el.focus()
  }
}
