import express from "express";
import  {v4 as  gerarNumerosAleatorios} from "uuid"
import cors from "cors";
import route from "./routes/routes";
const porta = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(route);


app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta: ${porta}`);
})
