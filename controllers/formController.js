

const getForm = (req,res) =>{
    res.render("index", {title: "CRUD/Ingreso" , logo:"form", EstasEn: "Ingreso de Datos" , SexoM:"Masculino", SexoF: "Femenino"})
};

const getEdit = (req , res)=>{
    res.render("Editar" , {title: "CRUD/Editar" , logo:"form", EstasEn: "Editar Datos" ,Ingreso: "Ingreso de Datos" ,SexoM: "Masculino" , SexoF: "Femenino"})
};

const getMasculino = (req , res)=>{
    res.render("Homb" , {title: "CRUD/Masculino", logo: "form", EstasEn: "Datos Masculinos", Ingreso: "Ingreso de Datos" , SexoF: "Femenino"})
}

const getFemenino = (req , res)=>{
    res.render("Muj" , {title: "CRUD/Femenino", logo: "form", EstasEn: "Datos Femeninos", Ingreso: "Ingreso de Datos" , SexoM: "Masculino"})
}

export default{
	getForm, 
    getEdit,
    getMasculino, 
    getFemenino,
};