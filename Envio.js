const formulario = document.querySelector("[data-form]");
let nombre = document.querySelector("[data-Nombre]");
let sexo = document.querySelector("[data-sexo]");
let edad = document.querySelector("[data-edad]")
let Hombre = document.querySelector("[data-hombre]");
let Mujer = document.querySelector("[data-mujer]");

formulario.addEventListener("submit", (e)=>{
e.preventDefault();


const addDatos = (nombre, sexo,edad) =>{

    if(sexo == "Hombre")
    return fetch("http://localhost:3004/Hombre",{
    method: "POST",
headers:{
    "Content-Type": "application/json"
},
body: JSON.stringify({nombre, sexo,edad,id: uuid.v4()})
})
.then(res => console.log(res))
.catch(err => console.log(err));

if(sexo == "Mujer")
return fetch("http://localhost:3004/Mujer",{
    method: "POST",
headers:{
    "Content-Type": "application/json"
},
body: JSON.stringify({nombre, sexo, edad, id: uuid.v4()})
})
.then(res => console.log(res))
.catch(err => console.log(err))};
   

  
  const Elsexo = ()=>{
      if(sexo.value == "Hombre")
      sexo = Hombre.textContent;
      if(sexo.value == "Mujer")
      sexo = Mujer.textContent;
      
      return sexo;
    };
    
    
    
    Elsexo();
    
    if(nombre != "")
    nombre = nombre.value;
    if(edad != "")
    edad = edad.value;
    console.log(nombre, Elsexo(), edad);
    
    
    addDatos(nombre, sexo, edad);
    
  
    
    
});



