import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStickyPosition]'
})
export class StickyPositionDirective implements OnInit {

  @Input() public startPosition: number;
  @Input() public disableWidth: number;
  private canDo = true;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.initialize();
  }

  @HostListener('window:scroll', ['$event'])
  public scroll(e) {
    if (this.canDo) {
      this.reinitialization();
    }
  }

  @HostListener('window:resize')
  public resize() {
    this.initialize();
    console.log('this.canDo', this.canDo);
    if (this.canDo) {
      this.reinitialization();
    }
  }

  public initialize() {
    const bodyWidth = document.body.offsetWidth;
    this.canDo =  bodyWidth > this.disableWidth;
    if (!this.canDo) {
      this.removeClass();
      this.setTranslate(0);
    }
  }

  private reinitialization() {
    const yOffset = window.pageYOffset;
    this.calculateScroll(yOffset);
  }

  private setOffsetElement(yOffset) {
    const offsetTop = yOffset - this.startPosition;
    this.setTranslate(offsetTop);
  }

  private calculateScroll(yOffset) {

    if (yOffset >= this.startPosition ) {
      this.addClass();
      this.setOffsetElement(yOffset);
    } else {
      this.removeClass();
      this.setTranslate(0);
    }
  }

  private setTranslate(offsetTop: number) {
    this.el.nativeElement.style.transform = `translateY(${offsetTop}px)`;
  }

  private addClass() {
    this.el.nativeElement.classList.add('move');
  }
  private removeClass() {
    this.el.nativeElement.classList.remove('move');
  }

}
