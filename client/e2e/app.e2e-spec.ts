import { AngularGraphqlFullstackSeedClientPage } from './app.po';

describe('angular-graphql-fullstack-seed-client App', () => {
  let page: AngularGraphqlFullstackSeedClientPage;

  beforeEach(() => {
    page = new AngularGraphqlFullstackSeedClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
