import { browser, by, element } from 'protractor';

export class BkngAngularGraphqlFullstackSeedPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('bkng-root h1')).getText();
  }
}
