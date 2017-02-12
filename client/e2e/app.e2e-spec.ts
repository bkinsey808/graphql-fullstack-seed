import { AngularOfflineFirstGraphqlClientPage } from './app.po';

describe('angular-offline-first-graphql-client App', function() {
  let page: AngularOfflineFirstGraphqlClientPage;

  beforeEach(() => {
    page = new AngularOfflineFirstGraphqlClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
