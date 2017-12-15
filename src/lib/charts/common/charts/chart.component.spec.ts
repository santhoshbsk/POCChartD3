import {
  TestBed,
  async
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ChartCommonModule } from '../chart-common.module';

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  barData: any;
}

describe('<ana-charts-chart>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, ChartCommonModule]
    });

  });

  describe('basic setup', () => {

    beforeEach(async(() => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <ana-charts-chart
                        [view]="[400,800]"
                        >
                        <p>ana-charts is cool!</p>
                    </ana-charts-chart>
                `
        }
      }).compileComponents();
    }));

    it('should set the svg width and height', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    }));

    it('should correctly project the inner content', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const textNode = fixture.debugElement.nativeElement.querySelector('svg p');

      expect(textNode.textContent).toEqual('ana-charts is cool!');
    }));

  });
});
