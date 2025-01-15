interface petType {
    id: String;
    name:String;
    type:String;
    description: String;
	vaccinated:  false,
	deadline_vaccination: String
	created_at: String;
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