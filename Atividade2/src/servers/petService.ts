import { Request, Response } from "express";
import { petshopType } from "../types/petShopTypes";
import { petType } from "../types/petTypes";
import { prisma } from "../config/prisma";

export const listarPets = async (cnpj:string)=>{
    const pets = await prisma.petShops.findUnique({
        where:{
            cnpj: cnpj
        },
        select:{
            pets: true

        }
    })
    return pets;
}
export const criarPet = async (newPet: petType, cnpj:string)=>{
    const pet = await prisma.petShops.update({
        where:{
            cnpj:cnpj
        },
        data:{
            pets:{
                create:[newPet]
            }
        },
        include:{
            pets:true
        }
    })
    return pet.pets;
}
export const atualizarPet = async (dadosPet:petType, cnpj:string, id:string)=>{
    const petNovoDados = await prisma.petShops.update({
        where:{
            cnpj:cnpj
        },
        data:{
            
            pets:{
                update:{
                    where:{
                        id:id
                    },
                    data:{
                        ...dadosPet
                    }
                }
                
            }
        }
    })
    return petNovoDados;

}

export const atualizarAtributoVaccinated = async(id:string, cnpj:string)=>{
    const atualizado = await prisma.petShops.update({
        where:{
            cnpj:cnpj
        },
        data:{
            pets:{
                update:{
                    where:{
                        id:id
                    },
                    data:{
                        vaccinated:true
                    }
                }
            }
        }
    })
    return atualizado
}
export const deletePet = async(id:string, cnpj:string)=>{
    const petDeletado =  await prisma.petShops.update({
        where:{
            cnpj:cnpj
        },
        data:{
            pets:{
                delete:{
                    id: id
                }
            }
        },
        include:{
            pets:true
        }

    })
    return petDeletado.pets;
}