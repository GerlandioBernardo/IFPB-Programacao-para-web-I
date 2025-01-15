import{Request, Response} from "express";
import * as petService from "../servers/petService"
import { prisma } from "../config/prisma";

export const listarPets = async(req:Request, res:Response) =>{
    const petShop = req.petshop;
    try{
        const pets = await petService.listarPets(petShop.cnpj);
        res.status(201).json(pets);
    }catch(error){
        console.log('Erro ao listar pets: ', error)
    }

}
export const criarPet = async (req:Request, res:Response)=>{
    const petShop = req.petshop;
    try{
        const dados = req.body;
        const pet = await petService.criarPet(dados, petShop.cnpj);
        res.status(201).json(pet);

    }catch(error){
        console.log('Erro ao tentar criar um pet: ', error)

    }

}
export const atualizarPet = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id
        const petShop = req.petshop;
        const dados = req.body;

        const arrayPets = await prisma.petShops.findUnique({
            where:{
                cnpj: petShop.cnpj
            },
            include:{
                pets: true
            }
    
        })
        const existe = arrayPets?.pets.find((valor) => valor.id === id);  
        if(!existe){
            res.status(404).json({errror: "PET not exists"})
            return;
        }
        const dadosAtualizadosPet = await petService.atualizarPet(dados, petShop.cnpj, id);
        res.status(201).json({mensagem: "PET atualizado com sucesso"});
    }catch(error){
        console.log("Erro ao tentar atualizar dados do pet: ", error);
    }
}
export const atualizarVaccinated = async(req:Request, res:Response)=>{
    const id = req.params.id
    const petShop = req.petshop;

   
    const arrayPets = await prisma.petShops.findUnique({
        where:{
            cnpj: petShop.cnpj
        },
        include:{
            pets: true
        }

    })
    const existe = arrayPets?.pets.find((valor) => valor.id === id);  
    if(!existe){
        res.status(404).json({errror: "PET not exists"})
        return;
    }
    const atualizado = await petService.atualizarAtributoVaccinated(id, petShop.cnpj);
    res.status(201).json({mensagem: "Atributo vaccinated atualizado com sucesso"});

}
export const deletePet = async(req:Request, res:Response)=>{
    const id = req.params.id;
    const petShop = req.petshop;

    const arrayPets = await prisma.petShops.findUnique({
        where:{
            cnpj: petShop.cnpj
        },
        include:{
            pets: true
        }

    })
    const existe = arrayPets?.pets.find((valor) => valor.id === id);   
    if(!existe){
        res.status(404).json({errror: "PET not exists"})
        return;
    }
    const pets = await petService.deletePet(id, petShop.cnpj);
    res.status(200).json({mensagem: "PET removido com sucesso", pets})


}