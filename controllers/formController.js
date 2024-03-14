

const getForm = (req,res) =>{
    res.render("index", {title: "CRUD/Ingreso" , logo:"form", EstasEn: "Ingreso de Datos" , SexoM:"Masculino", SexoF: "Femenino"})
};

const getEdit = (req , res)=>{
    res.render("Editar" , {title: "CRUD/Editar" , logo:"form", EstasEn: "Editar Datos" ,Ingreso: "Ingreso de Datos" ,SexoM: "Masculino" , SexoF: "Femenino"})
}

export default{
	getForm, 
    getEdit,
};