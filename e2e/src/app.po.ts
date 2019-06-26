import { browser, by, element } from 'protractor';

export class AppPage {

  listClienteSelector = ".list li";
  buttonEditSelector = ".list li a[class='primary']";
  buttonRemoveSelector = ".list li a[class='danger']";
  clientNameSelector = ".info h3";
  clientCPFSelector = ".info span";

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getClients() {
    return element.all(by.css(this.listClienteSelector));
  }

  getEditButton() {
    return element(by.css(this.buttonEditSelector));
  }

  getRemoveButton() {
    return element(by.css(this.buttonRemoveSelector));
  }

  getClientName() {
    return element(by.css(this.clientNameSelector)).getText();
  }

  getClientCPF() {
    return element(by.css(this.clientCPFSelector)).getText();
  }

  sleep(time: number){
    browser.sleep(time)
  }
}
