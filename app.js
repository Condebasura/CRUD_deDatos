import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {fileURLToPath} from "url";
import FormController from "./controllers/formController.js";
import bd from "./model/bd.js";
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = (process.platform === "win32")? fileURLToPath(new URL(".", import.meta.url)):path.dirname(new URL(import.meta.url).pathname);
const app = express();

const port = 3000;
const corsOptions = {
    origin: '*', // Origen permitido (puedes usar * para permitir todo)
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization',
     // Encabezados permitidos
    // ... otras opciones ...
};

app.use(cors(corsOptions));
app.use(helmet({ contentSecurityPolicy:{
  directives:{
    defaultSrc:["'self' https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"],
    scriptSrc: [ "'self' https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js "],
   

  }
}}));
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/Clientes", bd.ConsultRegistro);
app.get("/", FormController.getForm);
app.get("/Editar", FormController.getEdit);
app.get("/Homb", FormController.getMasculino);
app.get("/Muj" , FormController.getFemenino);
app.get("/Homb/clientesM", FormController.getDataM);
app.get("/Muj/clientesF", FormController.getDataF);
app.post("/Homb", FormController.IngresaCliente);
app.post("/Muj", FormController.IngresaCliente);
app.post("/Editar", FormController.datAEditar);
app.put("/Editar", FormController.ActualizarCliente);
app.post("/Homb/delete", FormController.datAEditar);
app.delete('/Homb/delete/:Email', FormController.EliminarCliente);



app.listen(port , ()=>{
	console.log(`La aplicacion esta funcionando en http://localhost:${port}`);
});
