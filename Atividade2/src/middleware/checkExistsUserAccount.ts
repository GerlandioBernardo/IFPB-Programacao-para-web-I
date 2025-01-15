import {Request, Response, NextFunction} from "express";
import { prisma } from "../config/prisma";

export const checkExistsUserAccount = async(req:Request,res:Response, next:NextFunction)=>{
    const cnpj = req.headers.cnpj as string;
    const petshop = await prisma.petShops.findUnique({
        where:{
            cnpj: cnpj
        }
    })
    if(!petshop){
        res.status(404).json({error: "PESTHOP not exists"})
        return;
    }
    req.petshop = petshop;
    next();
}