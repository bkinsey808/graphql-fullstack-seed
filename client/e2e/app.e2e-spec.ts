import { BkngAngularGraphqlFullstackSeedPage } from './app.po';

describe('bkng-angular-graphql-fullstack-seed App', () => {
  let page: BkngAngularGraphqlFullstackSeedPage;

  beforeEach(() => {
    page = new BkngAngularGraphqlFullstackSeedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to bkng!!');
  });
});
