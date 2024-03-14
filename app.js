import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {fileURLToPath} from "url";
import FormController from "./controllers/formController.js";

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
const hConfi =  ({
   directives: {
	 defaultSrc: ["'self'"],
	 scriptSrc: ["'self'", "https://kit.fontawesome.com/523f183385.js" ],
	 styleSrc: ["'self'", "'unsafe-inline'"]
   }
 });
app.use(cors(corsOptions));
app.use(helmet(hConfi));
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", FormController.getForm);

app.listen(port , ()=>{
	console.log(`La aplicacion esta funcionando en http://localhost:${port}`);
});
