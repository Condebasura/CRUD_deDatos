import bd from "../model/bd.js";

const getForm = (req,res) =>{
    res.render("index", {title: "CRUD/Ingreso" , logo:"form", EstasEn: "Ingreso de Datos" , SexoM:"Masculino", SexoF: "Femenino"})
};

const getEdit = (req , res)=>{
    res.render("Editar" , {title: "CRUD/Editar" , logo:"form", EstasEn: "Editar Datos" ,Ingreso: "Ingreso de Datos" ,SexoM: "Masculino" , SexoF: "Femenino"})
};

const getMasculino = (req , res)=>{
    res.render("Homb" , {title: "CRUD/Masculino", logo: "form", EstasEn: "Datos Masculinos", Ingreso: "Ingreso de Datos" , SexoF: "Femenino"});
   
}

const getFemenino = (req , res)=>{
    res.render("Muj" , {title: "CRUD/Femenino", logo: "form", EstasEn: "Datos Femeninos", Ingreso: "Ingreso de Datos" , SexoM: "Masculino"})
}

const IngresaCliente = async(req, res)=>{
    let cliente = {
      Nombre: req.body.nombre,
      Apellido: req.body.apellido,
      Email: req.body.email,
      Sexo: req.body.sexo,
      Edad: req.body.edad,
      Telefono: req.body.tel,
      Direccion: req.body.direc,
      Ciudad: req.body.city,
      Provincia: req.body.prov,
      Pais: req.body.pais,
    };

    try{
            const CorreoUsado = await bd.EmailenUso(cliente);
            if(CorreoUsado){
                res.status(409);
                res.json({mensaje:`El email ${cliente.Email} No esta disponible`});
                console.log(`${cliente.Email} No esta disponible`);
            }else if(!CorreoUsado){
                await bd.InsertCliente(cliente);
                res.status(200);
                res.json({mensaje: 'Cliente ingresado con exito!!'});
                console.log('Cliente ingresado con exito!!');
            }
          
    }catch(error){
        console.log(error);
    }
}

const getDataM =  (req, res)=>{

    bd.DatosM()
    .then(cliente =>{
        res.json(cliente);
    }).catch(err =>{
        console.log(err.message)
    })

 


}

const getDataF =  (req, res)=>{

    bd.DatosF(cliente)
    .then(cliente =>{
        res.json(cliente);
    }).catch(err =>{
        console.log(err.message)
    })

 


};
const ActualizarCliente = async(req, res)=>{
    let cliente = {
      Nombre: req.body.nombre,
      Apellido: req.body.apellido,
      Email: req.body.email,
      Sexo: req.body.sexo,
      Edad: req.body.edad,
      Telefono: req.body.tel,
      Direccion: req.body.direc,
      Ciudad: req.body.city,
      Provincia: req.body.prov,
      Pais: req.body.pais,
    };

    try{
          const datos = bd.EmailenUso(cliente);
          if(datos === cliente.Email){
            console.log(cliente.Email)
          }
          
    }catch(error){
        console.log(error);
    }
}


export default{
	getForm, 
    getEdit,
    getMasculino, 
    getFemenino,
    IngresaCliente,
    getDataM,
    getDataF,
    ActualizarCliente
};