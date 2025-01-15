import { petType } from "./petTypes";

export interface petshopType {
    id: string;
    name: string;
    cnpj: string;
    pets: petType[];
}