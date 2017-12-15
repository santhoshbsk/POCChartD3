import { AnaChartsModule } from '.';

/*
  This file is to import the main module. By importing it into this
  spec file, all the attached components get traversed and recognized
  in the code coverage stats.
*/

describe('ana-charts Module', () => {

  it('should load', () => {
    expect(AnaChartsModule).toBeDefined();
  });

});
