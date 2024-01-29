

const getForm = (req,res) =>{
    res.render("index", {title: "CRUD de Datos" , logo:"form", EstasEn: "Ingreso de Datos" , SexoM:"Masculino", SexoF: "Femenino"})
};

export default{
	getForm
};