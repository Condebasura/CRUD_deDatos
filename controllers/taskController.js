

const getForm = (req,res) =>{
    res.render("index", {title: "CRUD de Datos" , logo:"form", EstasEn: "Ingreso de Datos" , SexoM:"Masculino", SexoF: "Femenino", LNombre:"Nombre", LApellido:"Apellido", LEmail:"Email", LSexo:"Sexo", LNacimiento:"Fecha de Nacimiento", LTel:"Telefono", LDirec:"Direccion", LCiudad:"Ciudad", LProvincia:"Provincia", LPais:"Pais", boton:"Enviar"})
};

export default{
	getForm
};