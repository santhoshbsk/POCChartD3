import { D3toD4Page } from './app.po';

describe('d3to-d4 App', () => {
  let page: D3toD4Page;

  beforeEach(() => {
    page = new D3toD4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
