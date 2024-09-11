import  sqlite3  from "sqlite3";

let bd = new sqlite3.Database('Registro.bd');
bd.run('CREATE TABLE IF NOT EXISTS clientes (id INTEGRER AUTO INCREMENT , Nombre VARCHAR(150) , Apellido VARCHAR(150) , Email VARCHAR(150) PRIMARY KEY , Sexo VARCHAR(50) , Edad DATE , Telefono NUMBER , Direccion VARCHAR(150) , Ciudad VARCHAR(150) , Provincia VARCHAR(150) , Pais VARCHAR(150) )');


const ConsultRegistro = ()=>{
    bd.all('SELECT * FROM clientes' , (err,rows)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log('clientes encontrados' + rows.length);
            rows.forEach((row) => {
                console.log(row)
                
            });
        }
    })
};

const InsertCliente = async (cliente)=>{
    try{
         let stmt =  bd.prepare('INSERT INTO clientes(Nombre ,Apellido , Email, Sexo, Edad , Telefono, Direccion , Ciudad , Provincia , Pais) VALUES(?,?,?,?,?,?,?,?,?,?)');
         stmt.run(cliente.Nombre , cliente.Apellido , cliente.Email , cliente.Sexo , cliente.Edad, cliente.Telefono , cliente.Direccion , cliente.Ciudad , cliente.Provincia, cliente.Pais)

    stmt.finalize();
    return "Cliente Registrado con exito";

    }catch(error){
        throw console.log(error);
    }
}

const EmailenUso =(cliente)=>{

    return new Promise((resolve , reject)=>{

        let sql = 'SELECT * FROM clientes WHERE Email = ?';
        
        let mail = cliente.Email;
        
        bd.get(sql , [mail], (err , row )=> {
        
            if(err){
                console.error(err.message);
                reject(err);
                
            }if(row){

                resolve(true);
               
            } else{
                
                resolve(false);
            }
            
            
        });
    })
};

const DatosM = () =>{

 return new Promise((resolve, reject)=>{
    let sql = 'SELECT * FROM clientes WHERE Sexo = "Masculino"';
    bd.all(sql, (err, rows)=>{
        if(err){
            reject(err.message);
        }else{
            console.log("Encontrados:"  + rows.length);
            resolve(rows);
        }
    })
 })  
 
    

};



const DatosF = () =>{

    return new Promise((resolve, reject)=>{
       let sql = 'SELECT * FROM clientes WHERE Sexo = "Femenino"';
       bd.all(sql, (err, rows)=>{
           if(err){
               reject(err.message);
           }else{
               console.log("Encontrados:"  + rows.length);
               resolve(rows);
           }
       })
    })  
};

const filDatosFemeninos = (cliente) =>{
    return new Promise((resolve , reject)=>{
        let sql = 'SELECT * FROM clientes WHERE Sexo = "Femenino" AND Apellido = ?';
        
        let lastName = cliente.Apellido;
        bd.all(sql, [lastName], (err, rows)=>{
            if(err){
                reject(err.message)
            }
            else{
                resolve(rows)
                console.log("Filtrado:" + lastName)
            }
        })
    })

}

const filDatosMasculinos = (cliente) =>{
    return new Promise((resolve , reject)=>{
        let sql = 'SELECT * FROM clientes WHERE Sexo = "Masculino" AND Apellido = ?';
        
        let lastName = cliente.Apellido;
        bd.all(sql, [lastName], (err, rows)=>{
            if(err){
                reject(err.message)
            }
            else{
                resolve(rows)
                console.log("Filtrado:" + lastName)
            }
        })
    })

}
    
    const UpdateCliente = async (cliente)=>{
        try{
             const sql = 'UPDATE clientes SET Nombre = ?, Apellido = ? , Sexo = ?, Edad = ?, Telefono = ?,  Direccion = ? , Ciudad = ?, Provincia = ? , Pais = ? WHERE Email = ? ';

               bd.run(sql , [cliente.Nombre , cliente.Apellido , cliente.Sexo , cliente.Edad, cliente.Telefono , cliente.Direccion , cliente.Ciudad , cliente.Provincia, cliente.Pais ,cliente.Email ] , (err)=>{
                if(err){
                    console.log(err.message)
                }else{
                    console.log('Se actualizaron los datos correctamente');
                    
                }
               } );
             
    
        
    
        }catch(error){
            throw console.log(error);
        }
    } 

    const validaDatos =(Email)=>{

        return new Promise((resolve , reject)=>{
    
            let sql = 'SELECT * FROM clientes WHERE Email = ?';
            
            
            
            bd.get(sql , [Email], (err , row )=> {
            
                if(err){
                    console.error(err.message);
                    reject(err);
                    
                }if(row){
                    resolve(row)
                   
                } 
                
                
            });
        })
    };

    const deleteCliente = (Email)=>{
        
            let sql = "DELETE FROM clientes WHERE Email = ?";
            bd.run(sql , [Email], (err)=>{
                if(err){
                    console.log("Ocurrio un error al eliminar el cliente");
                }else{
                    console.log("Cliente eliminado con exito");
                }
            })
        
    }
   
   
export default {
    InsertCliente, 
    EmailenUso,
    ConsultRegistro,
    DatosM,
    filDatosMasculinos,
    DatosF,
    filDatosFemeninos,
    UpdateCliente,
    validaDatos,
    deleteCliente,
}