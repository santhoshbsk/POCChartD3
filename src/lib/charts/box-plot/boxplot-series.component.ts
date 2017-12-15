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
    selector: 'g[ana-charts-boxplot-series]',
    template: `
    <svg:g *ngFor="let box of boxs"  class="boxplot" [attr.transform]="box.transform">
        <svg:g ana-charts-boxploat-whisker 
            *ngFor="let whisker of box.whisker"
             [whisker]="whisker"
             ana-tooltip
             [tooltipDisabled]="tooltipDisabled"
             [tooltipPlacement]="tooltipPlacement"
             [tooltipType]="tooltipType"
             [tooltipTitle]="tooltipTemplate ? undefined : whisker.tooltipText"
             [tooltipTemplate]="tooltipTemplate"> 
        </svg:g>
        <svg:g ana-charts-boxploat-box 
            [box]="box"
            ana-tooltip
            [tooltipDisabled]="tooltipDisabled"
            [tooltipPlacement]="tooltipPlacement"
            [tooltipType]="tooltipType"
            [tooltipTitle]="tooltipTemplate ? undefined : box.rect.tooltipText"
            [tooltipTemplate]="tooltipTemplate">
        </svg:g>
        <svg:g ana-charts-boxploat-outlier 
            *ngFor="let outlier of box.outliers" 
            [outlier]="outlier"
            ana-tooltip
            [tooltipDisabled]="tooltipDisabled"
            [tooltipPlacement]="tooltipPlacement"
            [tooltipType]="tooltipType"
            [tooltipTitle]="tooltipTemplate ? undefined : outlier.tooltipText"
            [tooltipTemplate]="tooltipTemplate">
        </svg:g>
    </svg:g>
`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxplotSeriesComponent implements OnChanges {

    @Input() dims;
    @Input() type = 'standard';
    @Input() series;
    @Input() xScale;
    @Input() yScale;
    @Input() colors;
    @Input() gradient;
    @Input() tooltipDisabled: boolean = false;
    @Input() tooltipTemplate: TemplateRef<any>;
    @Input() animations: boolean = true;

    @Output() select = new EventEmitter();
    @Output() activate = new EventEmitter();
    @Output() deactivate = new EventEmitter();

    boxs: any;
    maxBoxWidth = null;
    tooltipPlacement: string;
    tooltipType: string;

    getX = function (d) { return d.name }; // Default data model selectors.
    getQ1 = function (d) { return d.value.Q1 };
    getQ2 = function (d) { return d.value.Q2 };
    getQ3 = function (d) { return d.value.Q3 };
    getWl = function (d) { return d.value.whisker_low };
    getWh = function (d) { return d.value.whisker_high };
    getColor = function (d) { return d.color };
    getOlItems = function (d) { return d.value.outliers };
    getOlValue = function (d) { return d };
    getOlLabel = function (d) { return d };
    getOlColor = function (d) { return undefined };


    ngOnChanges(changes): void {
        this.update();
    }

    update(): void {
        this.updateTooltipSettings();

        let self = this;
        var box_width = (this.maxBoxWidth === null ? this.xScale.bandwidth() * 0.9 : Math.min(75, this.xScale.bandwidth() * 0.9));
        var box_left = this.xScale.bandwidth() * 0.45 - box_width / 2;
        var box_right = this.xScale.bandwidth() * 0.45 + box_width / 2;

        this.boxs = this.series.map((d, index) => {
            let value = d.value;
            const label = d.name;
            const formattedLabel = formatLabel(label);
            const transform = 'translate(' + (self.xScale(self.getX(d)) + self.xScale.bandwidth() * 0.05) + ', 0)';
            const color = self.colors.getColor(label);
            const box = {
                data: d,
                label,
                color,
                transform,
                whisker: [],
                rect: {},
                median: {},
                outliers: []
            };

            // whisker lines and ticks
            for (let f of [self.getWl, self.getWh]) {
                if (f(d) !== undefined && f(d) !== null) {
                    let key = (f === self.getWl) ? 'low' : 'high';
                    var endpoint = (f === self.getWl) ? self.getQ1 : self.getQ3;
                    const tooltipLabel = formatLabel(f(d));
                    let whisker = {
                        line: {
                            color,
                            key,
                            x1: self.xScale.bandwidth() * 0.45,
                            y1: self.yScale(f(d)),
                            x2: self.xScale.bandwidth() * 0.45,
                            y2: self.yScale(endpoint(d))
                        },
                        lineTick: {
                            color,
                            key,
                            x1: box_left,
                            y1: this.yScale(f(d)),
                            x2: box_right,
                            y2: this.yScale(f(d))
                        },
                        tooltipText: this.tooltipDisabled ? undefined : `
                        <span class="tooltip-label"></span>
                        <span class="tooltip-val">${tooltipLabel}</span>
                        `
                    };
                    box.whisker.push(whisker);

                }
            }

            // boxes
            box.rect = {
                y: self.yScale(self.getQ3(d)),
                width: box_width,
                x: box_left,
                height: (Math.abs(self.yScale(self.getQ3(d)) - self.yScale(self.getQ1(d))) || 1),
                color,
                tooltipText: this.tooltipDisabled ? undefined : `
                <span class="tooltip-label">${formattedLabel}</span>
                <span class="tooltip-val">
                    <p>Q3: ${self.getQ3(d)}</p>
                    <p>Q2: ${self.getQ2(d)}</p>
                    <p>Q1: ${self.getQ1(d)}</p>
                </span>
              `
            }
            // median line

            box.median = {
                x1: box_left,
                y1: self.yScale(self.getQ2(d)),
                x2: box_right,
                y2: self.yScale(self.getQ2(d))
            }

            // outliers
            let outliers = self.getOlItems(d) || [];
            for (let outlier of outliers) {
                const tooltipLabel = formatLabel(outlier);
                box.outliers.push({
                    color,
                    cx: self.xScale.bandwidth() * 0.45,
                    cy: self.yScale(self.getOlValue(outlier)),
                    r: 3,
                    tooltipText: this.tooltipDisabled ? undefined : ` 
                        <span class="tooltip-label"></span>
                        <span class="tooltip-val">${tooltipLabel}</span>
                        `
                });
            }

            return box;
        });
    }

    updateTooltipSettings() {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'right';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    }

    onClick(data): void {
        this.select.emit(data);
    }

    trackBy(index, box): string {
        return box.label;
    }
}  