import express, {Request, Response, NextFunction}  from "express";
import cors from "cors";
import {v4 as gerarNumerosAleatorios} from "uuid";
const porta = 3000;

const app = express();
app.request.petshop;
app.use(express.json());
app.use(cors());

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


const arraypetshop:petshopType[] = [];
function checkExistsUserAccount(req:Request, res:Response, next: NextFunction){
    const cnpj = req.headers.cnpj as string;
    const petshop = arraypetshop.find((valor)=> valor.cnpj === cnpj);
    if(!petshop){
        res.status(404).json({error: "PESTHOP not exists"})
        return;
    }
    req.petshop = petshop;
    next()
}

app.post('/petshop', (req:Request, res:Response)=>{
    const dados = req.body;
    const  petshop: petshopType | null ={
        id: gerarNumerosAleatorios(),
        name: dados.name,
        cnpj: dados.cnpj,
        pets:[]
    }
    if(!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(dados.cnpj)){
        res.status(400).json({error: "CNPJ Invalido"});
        return;
    }
    const existe = arraypetshop.some(valor => valor.cnpj === dados.cnpj);
    if(existe){
        res.status(400).json({error: "PETSHOP já existente"});
        return;

    }
    arraypetshop.push(petshop);
    res.status(201).json(arraypetshop);

})
app.get('/pets', checkExistsUserAccount, (req:Request, res:Response)=>{
    const petshop = req.petshop;
    if(!petshop){
        res.status(404).json({error: "PESTHOP not exists"})
        return;
    }
    res.status(200).json(petshop.pets);


})
app.post('/pets',checkExistsUserAccount, (req:Request, res:Response)=>{
    const petshop = req.petshop;
    let dados = req.body
    const pet: petType | null={
        id:gerarNumerosAleatorios(),
        name:dados.name,
        type:dados.type,
        deadline_vaccination: dados.deadline_vaccination,
        created_at: new Date(),
        description: dados.description,
        vaccinated: false,
    }
    if(!petshop){
        res.status(404).json({errror: "PESTHOP not exists"})
        return;
    }
    petshop.pets.push(pet);
    res.status(201).json(pet)
})
app.put('/pets/:id', checkExistsUserAccount, (req:Request, res:Response)=>{
    const petshop = req.petshop;
    const dados = req.body;
    const id = req.params.id; 
    if(!petshop){
        res.status(404).json({errror: "PESTHOP not exists"})
        return;
    }
    const pet = petshop.pets.find((valor: petshopType["pets"][number]) => valor.id === id);
    if(!pet){
        res.status(404).json({errror: "PET not exists"})
        return;
    }
    pet.name = dados.name;
    pet.type = dados.type;
    pet.description = dados.description;
    pet.deadline_vaccination = dados.deadline_vaccination;
    res.status(201).json({mensagem: "PET atualizado com sucesso"});

})
app.patch('/pets/:id/vaccinated', checkExistsUserAccount, (req:Request, res:Response)=>{
    const petshop = req.petshop;
    const id = req.params.id; 
    if(!petshop){
        res.status(404).json({error: "PESTHOP not exists"})
        return;
    }
    const pet = petshop.pets.find((valor: petshopType["pets"][number]) => valor.id === id);
    if(!pet){
        res.status(404).json({error: "PET not exists"})
        return;
    }
    pet.vaccinated = true;
    res.status(201).json({mensagem: "Atributo vaccinated atualizado com sucesso"});

})
app.delete('/pets/:id', checkExistsUserAccount, (req:Request, res:Response)=>{
    const petshop = req.petshop;
    const id = req.params.id;
    if(!petshop){
        res.status(404).json({error: "PESTHOP not exists"})
        return;
    }
    const pet = petshop.pets.find((valor: petshopType["pets"][number]) => valor.id === id);
    if(!pet){
        res.status(404).json({error: "PET not exists"})
        return;
    }
    const index = petshop.pets.findIndex((valor:petshopType["pets"][number])=> valor.id === id);
    petshop.pets.splice(index, 1);
    res.status(200).json({mensagem: "PET removido com sucesso"})
    res.json(petshop.pets);
})

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta: `, porta);
})
