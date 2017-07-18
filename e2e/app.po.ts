import { browser, element, by } from 'protractor';

export class ToDoAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-plan h1')).getText();
  }
}
