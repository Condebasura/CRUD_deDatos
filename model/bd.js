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


export default {
    InsertCliente, 
    EmailenUso,
    ConsultRegistro,
}