import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ana-charts-grid-panel]',
  template: `
    <svg:rect
      [attr.height]="height"
      [attr.width]="width"
      [attr.x]="x"
      [attr.y]="y"
      stroke="none"
      class="gridpanel"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPanelComponent {

  @Input() path;
  @Input() width;
  @Input() height;
  @Input() x;
  @Input() y;
  
}
