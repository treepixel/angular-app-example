import { VehicleBrand } from './vehicle-brand'
import { VehicleModel } from './vehicle-model'

export class Client {
    public name: string;
    public cpf: string;
    public phone: string;
    public birthday: Date;
    public brand: VehicleBrand;
    public vehicle: VehicleModel;

    constructor (
        name: string,
        cpf: string,
        phone: string,
        birthday: Date,
        brand: VehicleBrand,
        vehicle: VehicleModel
    )
    { 
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.birthday = birthday;
        this.brand = brand;
        this.vehicle = vehicle;
    }
}
