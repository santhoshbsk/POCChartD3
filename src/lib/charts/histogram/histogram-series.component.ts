import {
  Component,
  Input,
  Output,
  EventEmitter,
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
import { formatLabel } from '../common/label.helper';

@Component({
  selector: 'g[ana-charts-histogram-series]',
  template: `
    <svg:g ana-charts-histogram-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      [gradient]="gradient"
      [isActive]="isActive(bar.data)"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ana-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTemplate ? undefined : bar.tooltipText"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="bar.data"
      [animations]="animations">
    </svg:g>
  `,
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
export class HistogramSeriesComponent implements OnChanges {

  @Input() bins;
  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() gradient: boolean;
  @Input() activeEntries: any[];
  @Input() seriesName: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() roundEdges: boolean;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  tooltipPlacement: string;
  tooltipType: string;

  bars: any;

  ngOnChanges(changes): void {
    this.update();
  }

  update(): void {
    this.updateTooltipSettings();
    let width = this.xScale.bandwidth();

    this.bars = this.bins.map((d, index) => {
      const formattedLabel = formatLabel(d.count);
      const roundEdges = this.roundEdges;

      const bar: any = {
        roundEdges,
        data: d,
        width,
        formattedLabel,
        height: 0,
        x: 0,
        y: 0
      };


      bar.height = this.dims.height - this.yScale(d.count);
      bar.x = this.xScale(d.range);
      bar.y = this.yScale(d.count);
      bar.color = '#7aa3e5'; // this.colors.getColor(d.range);

      let tooltipLabel = formattedLabel;
      if (this.seriesName) {
        tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
        bar.data.series = this.seriesName;
      }

      bar.tooltipText = this.tooltipDisabled ? undefined : `
        <span class="tooltip-label">${tooltipLabel}</span>
        <span class="tooltip-val"></span>
      `;

      return bar;
    });
  }

  updateTooltipSettings() {
    this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
    this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
  }

  isActive(entry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name && entry.series === d.series;
    });
    return item !== undefined;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  trackBy(index, bar): string {
    return bar.label;
  }

}
