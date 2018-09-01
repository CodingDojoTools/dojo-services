import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[textOnHover]',
})
export class TextOnHoverDirective implements AfterViewInit {
  @Input()
  textOnHover = '';

  private originalText: string;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.originalText = this.el.nativeElement.innerText;
  }

  @HostListener('mouseenter')
  handleMouseIn() {
    this.set(this.textOnHover || this.originalText);
  }

  @HostListener('mouseleave')
  handleMouseOut() {
    this.set(this.originalText);
  }

  private set(value: string): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerText', value);
  }
}
