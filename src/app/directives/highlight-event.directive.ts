import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlightEvent]',
  standalone: true,
})
export class HighlightEventDirective implements OnChanges {
  // pass tickets left: [highlightEvent]="event.availableTickets"
  @Input('highlightEvent') ticketsLeft: number = 0;

  // optional featured flag: [featured]="event.featured"
  @Input() featured: boolean = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges(): void {
    const element = this.el.nativeElement;

    // reset
    element.style.border = '1px solid transparent';
    element.style.boxShadow = 'none';
    element.style.opacity = '1';

    // featured glow
    if (this.featured) {
      element.style.border = '1px solid #8b5cf6';
      element.style.boxShadow = '0 0 14px rgba(139, 92, 246, 0.35)';
    }

    // sold-out look
    if (Number(this.ticketsLeft) === 0) {
      element.style.border = '1px solid crimson';
      element.style.boxShadow = '0 0 14px rgba(220, 20, 60, 0.25)';
      element.style.opacity = '0.75';
    }
  }
}