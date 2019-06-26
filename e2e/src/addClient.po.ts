import { browser, by, element } from 'protractor';

export class AddClientPage {

  navigateTo() {
    return browser.get('/adicionar-cliente') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  fillClientForm(clientData: any) {
    if(clientData.name)
    element(by.css('[formcontrolname="name"]')).sendKeys(clientData.name);
    if(clientData.cpf)
    element(by.css('[formcontrolname="cpf"]')).sendKeys(clientData.cpf);
    if(clientData.phone)
    element(by.css('[formcontrolname="phone"]')).sendKeys(clientData.phone);
    if(clientData.birthday)
    element(by.css('[formcontrolname="birthday"]')).sendKeys(clientData.birthday);
    if(clientData.brand)
    element(by.css('[formcontrolname="brand"]')).sendKeys(clientData.brand);
    if(clientData.brand)
    element(by.css('[formcontrolname="vehicle"]')).sendKeys(clientData.vehicle);
  }

  getButton()  {
      return element(by.css('button'))
  }

  getField(name: string) {
      return element(by.css(`[formcontrolname=${name}]`));
  }

  sleep(time: number){
    browser.sleep(time)
  }
}
