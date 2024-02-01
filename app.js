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

app.use(cors());
app.use(helmet());
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
