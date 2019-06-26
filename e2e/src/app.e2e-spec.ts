import { AppPage } from './app.po';
import { AddClientPage } from './addClient.po';
import { browser, logging } from 'protractor';
import { async } from 'q';

describe('Angular Crud Application', () => {
  let page: AppPage;
  let addClientPage: AddClientPage; 

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title Clientes', () => {
    page.navigateTo();

    expect(page.getTitleText()).toEqual('Clientes');
  });

  it('should List of clients starts with 0 clients', async () => {
    const clientesCount = await page.getClients().count();

    expect(clientesCount).toBe(0);
  });

  it('should not enable add new client if dont fill every fields correctly', async () => {
    addClientPage = new AddClientPage();
    addClientPage.navigateTo();

    addClientPage.fillClientForm({
      name: "Antonio Rodrigues",
      cpf: '56024746172',
      phone:'6599999999',
      birthday: '03/11/1982'
    });

    expect(addClientPage.getButton().isEnabled()).toBe(false);
  });

  it('should not enable add new client if cpf field is invalid', async () => {
    addClientPage = new AddClientPage();
    addClientPage.navigateTo();

    addClientPage.fillClientForm({
      name: "Antonio Rodrigues",
      cpf: '99999999999',
      phone:'6599999999',
      birthday: '03/11/1982',
      brand: 'Acura',
      vehicle: 'Integra GS 1.8'
    });

    expect(addClientPage.getButton().isEnabled()).toBe(false);
  });

  it('should enable add new client if every field was filled correctly', async () => {
    addClientPage = new AddClientPage();
    addClientPage.navigateTo();

    addClientPage.fillClientForm({
      name: 'Antonio Rodrigues',
      cpf: '56024746172',
      phone:'6599999999',
      birthday: '03/11/1982',
      brand: 'Acura',
      vehicle: 'Integra GS 1.8'
    });

    expect(addClientPage.getButton().isEnabled()).toBe(true);
  });

  it('should add new client if every field was filled correctly', async () => {
    addClientPage = new AddClientPage();
    addClientPage.navigateTo();

    addClientPage.fillClientForm({
      name: 'Antonio Rodrigues',
      cpf: '56024746172',
      phone:'6599999999',
      birthday: '03/11/1982',
      brand: 'Acura',
      vehicle: 'Integra GS 1.8'
    });

    addClientPage.getButton().click();

    expect(page.getClients().count()).toBe(1);
  });

  it('should update client with new informations', async () => {
    page.getEditButton().click();

    await addClientPage.getField("name").clear();
    addClientPage.getField("name").sendKeys("Antonio Rodrigues Junior");

    await addClientPage.getField("cpf").clear();
    addClientPage.getField("cpf").sendKeys("83187429661");
    
    addClientPage.getButton().click();

    expect(page.getClientName()).toBe('Antonio Rodrigues Junior');
    expect(page.getClientCPF()).toBe('CPF: 831.874.296-61');
  });

  it('should remove client', async () => {
    page.getRemoveButton().click()

    const clientesCount = await page.getClients().count();

    expect(clientesCount).toBe(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
