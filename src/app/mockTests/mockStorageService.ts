import {BehaviorSubject, Observable} from 'rxjs';


export default class MockSorageService {
  clients = [
    {
      id: "asdf5545asdfsfd", 
      name:"Antonio Rodrigues", 
      cpf: "999.999.999-99", 
      phone:"659999999",
      birthday: "2019-04-04",
      brand: {nome: "Fiat", codigo: "01"},
      vehicle: {nome: "Toro", codigo: "06"}
    },
    {
      id: "asdf5545asd98123", 
      name:"Lara Ventura", 
      cpf: "999.999.999-99", 
      phone:"659999999",
      birthday: "2019-04-04",
      brand: {nome: "Fiat", codigo: "01"},
      vehicle: {nome: "Toro", codigo: "06"}
    }
  ];

  getClients(): Observable<any[]> {
    return new BehaviorSubject(this.clients);
  }

  addClient(client: any): void {
    this.clients.push(client);
  }

  editClient(client: any, id: string): void {
    this.clients = [
      ...this.clients.filter(client => client.id !== id),
      {
        ...this.clients.find(client => client.id == id),
        name: client.name,
        cpf: client.cpf,
        phone: client.phone,
        birthday: client.birthday,
        brand: client.brand,
        vehicle: client.vehicle
      }
    ];
  }

  removeClient(id: string):void {
    this.clients = this.clients.filter(client => client.id !== id);
  }
}