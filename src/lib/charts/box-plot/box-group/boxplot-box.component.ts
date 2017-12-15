import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { select } from 'd3-selection';

@Component({
  selector: 'g[ana-charts-boxploat-box]',
  template: `
      <svg:rect
        class="boxplot-box"        
        [attr.stroke]="box.color"
        [attr.fill]="box.color"
        [class.active]="isActive"
        [attr.height]="box.rect.height"
        [attr.width]="box.rect.width"
        [attr.x]="box.rect.x"
        [attr.y]="box.rect.y"
        (click)="select.emit(box.data)"        
      />
      <svg:line
        class="boxplot-median"
        [attr.x1]="box.median.x1"
        [attr.y1]="box.median.y1"
        [attr.x2]="box.median.x2"
        [attr.y2]="box.median.y2"
      />
    `,
  styles: [`
  .boxplot-median {
    stroke: black;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BoxploatBoxComponent implements OnChanges {

  @Input() box;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  element: any;
  initialized: boolean = false;

  tooltipPlacement: string;
  tooltipType: string;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.initialized = true;
    } else {
      this.update();
    }
  }

  update(): void {
    this.updateTooltipSettings();
    this.updatePathEl();
  }

  updatePathEl(): void {
    const node = select(this.element).select('.bar');
    // node.transition().duration(500)
    // .attr('d', path);
  }

  updateTooltipSettings() {
    this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
    this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
  }



  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.box.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.box.data);
  }

}
