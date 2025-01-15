import { Router } from "express";
import * as petShopController from "../controllers/petShopController"
import * as petController from "../controllers/petController"
import { checkExistsUserAccount } from "../middleware/checkExistsUserAccount";

const route = Router();

route.post('/petshop', petShopController.createPetShop);
route.get('/pets', checkExistsUserAccount, petController.listarPets);
route.post('/pets',checkExistsUserAccount, petController.criarPet);
route.put('/pets/:id', checkExistsUserAccount, petController.atualizarPet);
route.patch('/pets/:id/vaccinated', checkExistsUserAccount, petController.atualizarVaccinated);
route.delete('/pets/:id', checkExistsUserAccount, petController.deletePet);

export default route;
