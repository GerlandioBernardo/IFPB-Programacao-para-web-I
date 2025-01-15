import{Request, Response} from "express";
import * as petShopService from "../servers/petShopService"
import { prisma } from "../config/prisma";

export const createPetShop = async(req:Request, res:Response)=>{
    try{
    const dados = req.body;

    if(!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(dados.cnpj)){
        res.status(400).json({error: "CNPJ Invalido"});
        return;
    }
    const existe = await prisma.petShops.findUnique({
        where:{
            cnpj: dados.cnpj
        }
    })
    if(existe){
        res.status(400).json({error: "PETSHOP já existente"});
        return;
    }
    const petShop = await petShopService.createPetShop(dados);
    res.status(201).json(petShop);

    }catch(error){
        console.log("Erro ao tentar criar um petShop:", error)
    }

}