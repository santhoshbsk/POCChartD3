import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
    SimpleChanges,
    OnChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import { select } from 'd3-selection';

@Component({
    selector: 'g[ana-charts-boxploat-outlier]',
    template: `
        <svg:circle
          class="boxplot-outlier"
          [attr.stroke]="outlier.color"
          [attr.fill]="outlier.color"
          [attr.z-index]="9000"
          [attr.cx]="outlier.cx"
          [attr.cy]="outlier.cy"
          [attr.r]="outlier.r"
        />
      `,
    styles: [`
      .boxplot-outlier {
        fill-opacity: 0.5;
      }
    `, `
    .boxplot-outlier:hover {
      fill-opacity: 1;
    }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxploatOutlierComponent implements OnChanges {

    @Input() outlier;

    @Output() select = new EventEmitter();
    @Output() activate = new EventEmitter();
    @Output() deactivate = new EventEmitter();

    element: any;
    initialized: boolean = false;

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
        this.updatePathEl();
    }

    updatePathEl(): void {
        const node = select(this.element).select('.boxplot-outlier');
    }
}