export interface petType {
    id: string;
    name:string;
    type:string;
    description: string;
	vaccinated:  boolean;
	deadline_vaccination: Date;
	created_at: Date;
}