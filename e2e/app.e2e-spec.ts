import { MoviesearchPage } from './app.po';

describe('moviesearch App', () => {
  let page: MoviesearchPage;

  beforeEach(() => {
    page = new MoviesearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
