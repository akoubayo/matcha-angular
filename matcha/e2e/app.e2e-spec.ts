import { MatchaPage } from './app.po';

describe('matcha App', () => {
  let page: MatchaPage;

  beforeEach(() => {
    page = new MatchaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
