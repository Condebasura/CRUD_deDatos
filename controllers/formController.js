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
                res.json({mensaje:`El email "${cliente.Email}"  No esta disponible`});
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

    bd.DatosF()
    .then(cliente =>{
        res.json(cliente);
    }).catch(err =>{
        console.log(err.message)
    })

};
 
    
const filterDataF = async (req ,res) =>{
   const cliente = {
    apellido: req.body.filtro,
   }
   console.log(cliente.apellido)
}


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
         await bd.UpdateCliente(cliente);
         res.status(200).json({message: "Datos actualizados correctamente , volviendo al listado"})
          
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Error al actualizar los datos"})
    }
};



const datAEditar = async (req,res)=>{
 try{

     const validar = await bd.validaDatos(req.body.Email);
     if(validar){
         console.log(`Los datos de ${req.body.Email} coinciden con el de la bd`)
         res.json(validar);
        }
    }catch(err){
        console.log(err.message)
    }
  
}

const EliminarCliente = async (req , res)=>{
    
    try{
        let Email = await req.params.Email;
     await bd.deleteCliente(Email);
    console.log(`Cliente con email ${req.params.Email} eliminado correctamente.`);
}catch(err){
    console.log(err.message)
};

}




export default{
	getForm, 
    getEdit,
    getMasculino, 
    getFemenino,
    IngresaCliente,
    getDataM,
    getDataF,
    filterDataF,
    ActualizarCliente,
    datAEditar,
    EliminarCliente,
    
};