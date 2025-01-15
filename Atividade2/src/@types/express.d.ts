interface petType {
    id: String;
    name:String;
    type:String;
    description: String;
	vaccinated:  boolean;
	deadline_vaccination: Date;
	created_at: Date;
}
interface petshopType {
    id: String;
    name: String;
    cnpj: String;
    pets: petType[];
}
declare namespace Express {
    export interface Request {
        petshop: PetshopType;
    }
}