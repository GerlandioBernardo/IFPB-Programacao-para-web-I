import express from "express";
import { petshopType } from "../types/petShopTypes";
import { petType } from "../types/petTypes";
import { prisma } from "../config/prisma";

export const createPetShop = async(newPetShop:petshopType)=>{
    const petShop = await prisma.petShops.create({
        data:{
           cnpj: newPetShop.cnpj,
           name: newPetShop.name,
           id: newPetShop.id,
           pets:{
                create:[]
           }
        }
    })
    return petShop;
}

