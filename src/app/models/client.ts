import { VehicleBrand } from './vehicle-brand'
import { VehicleModel } from './vehicle-model'
import { generateUID } from '../Utils/UID'

export class Client {
    constructor (
        public name: string,
        public cpf: string,
        public phone: string,
        public birthday: Date,
        public brand: VehicleBrand,
        public vehicle: VehicleModel,
        public id?: string
    )
    { 
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.birthday = birthday;
        this.brand = brand;
        this.vehicle = vehicle;
        this.id = id === undefined ? generateUID() : id;
    }
}
