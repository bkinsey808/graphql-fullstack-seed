import { OfflineFirstGraphqlClientPage } from './app.po';

describe('offline-first-graphql-client App', function() {
  let page: OfflineFirstGraphqlClientPage;

  beforeEach(() => {
    page = new OfflineFirstGraphqlClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
