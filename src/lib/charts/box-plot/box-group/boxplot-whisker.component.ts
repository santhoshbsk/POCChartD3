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
    selector: 'g[ana-charts-boxploat-whisker]',
    template: `
        <svg:line 
          [attr.class]="whisker.line.key==='low'?'boxplot-whisker boxplot-low':'boxplot-whisker boxplot-high'"
          [attr.stroke]="whisker.line.color"
          [attr.x1]="whisker.line.x1"
          [attr.y1]="whisker.line.y1"
          [attr.x2]="whisker.line.x2"
          [attr.y2]="whisker.line.y2"
        />
        <svg:line 
            [attr.class]="whisker.lineTick.key==='low'?'boxplot-whisker boxplot-low':'boxplot-whisker boxplot-high'"
            [attr.stroke]="whisker.lineTick.color"
            [attr.x1]="whisker.lineTick.x1"
            [attr.y1]="whisker.lineTick.y1"
            [attr.x2]="whisker.lineTick.x2"
            [attr.y2]="whisker.lineTick.y2"
        />
      `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxploatWhiskerComponent implements OnChanges {

    @Input() whisker;

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
        const node = select(this.element).select('.boxplot-whisker');
        //node.attr('d', path);
    }
}