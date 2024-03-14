// se crea una variable para cada imput del formulario
const form = document.querySelector("[data-Edit]");
const nombre = document.querySelector(".nombre");
const apellido = document.querySelector(".ap");
const email = document.querySelector(".mail");
let sexo = document.querySelector("[data-sexo]");
let edad = document.querySelector(".naci");
const tel = document.querySelector(".tel");
const direc = document.querySelector(".direc");
const city = document.querySelector(".city");
const prov = document.querySelector(".prov");
const pais = document.querySelector(".pais");
// Se crean  RegEx

//  Para emails.
const regexEmails = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Para solo letras.
const regexLetras = /[a-z A-Z\\s]+/gu;
// Para letras y hasta 5 digitos, para direccion
const regexLetrasMasNum = /^\w+([A-z])\s\w+\w+.{0,5}$/;

// Trae los datos por id que van a ser cambiados
const detalleDatosH = (id) => {
  return fetch(`http://localhost:3004/Hombre/${id}`).then((res) => res.json()
)
 
};

const detalleDatosM = (id) => {
    return fetch(`http://localhost:3004/Mujer/${id}` ).then((res) => res.json()
    )
};
// cambia el formato de la fecha en el archivo json, de yyy/mm/dd a dd/mm/yyyy
function changeDateFormat(date) {
    const dateParts = date.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}
// se crea la funcion para actualizar los datos  dependiendo el sexo que se elija.
const actualizaDatosH = (nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais, id) => {
    edad = changeDateFormat(edad);
    return fetch(`http://localhost:3004/Hombre/${id}`, { 
       method: 'PUT',
    headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais })
    })
        .then(res => { 
            
        })
        .catch(err => console.error(err))
}

const actualizaDatosM = (nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais, id) => {
    edad = changeDateFormat(edad);
    return fetch(`http://localhost:3004/Mujer/${id}`, {
    method: "PUT",    
    headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais })
    })
        .then(res => {
      

        })
        .catch(err => console.error(err))
}



function revertDateFormat(date) {
   const dateParts = date.split("-");
   return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}
// Funcion para obtener los datos por su id
const obtenerDatos = async () => {

    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    console.log(id);
    const DesdePagina = url.get("desdepagina");
     console.log(DesdePagina);
   

     if (id == null) {
        console.error("Datos no encontrados");
        alert("NO SE ENCONTRARON LOS DATOS!!!");
    }


    if (DesdePagina == "../html/Homb.html") {
       try{
           const perfil = await detalleDatosH(id);
           console.log(perfil);
           if (perfil.nombre && perfil.apellido && perfil.email, perfil.sexo && perfil.edad && perfil.direc && perfil.tel && perfil.city && perfil.prov && perfil.pais) {
               nombre.value = perfil.nombre;
               apellido.value = perfil.apellido;
               email.value = perfil.email;
               sexo.value = perfil.sexo;
               perfil.edad = revertDateFormat(perfil.edad);
               edad.value = perfil.edad;
               tel.value = perfil.tel;
               direc.value = perfil.direc;
               city.value = perfil.city;
               prov.value = perfil.prov;
               pais.value = perfil.pais;
               console.log(perfil.edad);
            
            
        }
        
        
        else {throw new Error();}
            }catch(err){

                console.error('Error fetching data', err);
            }
        
    };

    if (DesdePagina == "../html/Muj.html") {
        try {
            const perfil = await detalleDatosM(id);
            console.log(perfil);
            if (perfil.nombre && perfil.apellido && perfil.email, perfil.sexo && perfil.edad && perfil.direc && perfil.tel && perfil.city && perfil.prov && perfil.pais) {
                nombre.value = perfil.nombre;
                apellido.value = perfil.apellido;
                email.value = perfil.email;
                sexo.value = perfil.sexo;
                perfil.edad = revertDateFormat(perfil.edad);
                edad.value = perfil.edad;
                tel.value = perfil.tel;
                direc.value = perfil.direc;
                city.value = perfil.city;
                prov.value = perfil.prov;
                pais.value = perfil.pais;
                console.log(perfil.edad)
            }

            else { throw new Error(); }

        } catch (err) {
            console.error('Error fetching data', err);
        }
    }
};

obtenerDatos();


//validaciones para el formulario

const validaNombre = () => {
    if (!regexLetras.test(nombre.value)) {
        nombre.style.border = " 2px solid red";
        nombre.setCustomValidity("El campo no puede estar vacio contener numeros o caracteres especiales");
        return false;
    } else {
        nombre.style.border = "none";
        nombre.setCustomValidity("");
        return true;
    }
};

nombre.addEventListener("input", validaNombre);

const validaApellido = () => {
    if (!regexLetras.test(apellido.value)) {
        apellido.style.border = " 2px solid red";
        apellido.setCustomValidity(`El campo no puede estar vacio contener numeros o caracteres especiales`);
        return false;
    } else {
        apellido.style.border = "none";
        apellido.setCustomValidity("");
        return true;
    }
};

apellido.addEventListener("input", validaApellido);

const validaEmail = () => {
    if (!regexEmails.test(email.value)) {
        email.style.border = "2px solid red";
        email.setCustomValidity("El campo no puede estar vacio contener numeros o caracteres especiales");
        return false;
    } else {
        email.style.border = "none";
        email.setCustomValidity("");
        return true;
    }
};

email.addEventListener("input", validaEmail);

const Elsexo = () => {
    console.log("cambio en el elemento sexo");
    if (sexo.value == "") {
        return false;
    }
    if (sexo.value == "Masculino") {
        sexo = sexo.value;
        return true;
    }
    if (sexo.value == "Femenino") {
        sexo = sexo.value;
        return true;
    }

};

sexo.addEventListener("change", Elsexo);

const ValidarFecha = () => {
    const max = new Date().getFullYear() + '-12-31';
    edad.setAttribute("max", max);

    if (edad > max) {
        return false;
    } else {
        return true;
    }
};

edad.addEventListener("input", ValidarFecha);

const Valtel = () => {
    if (tel.value == "" || tel.value.length > 12) {
        tel.style.border = "2px solid red";
        tel.setCustomValidity("Ingreso mas de 12 digitos o un numero invalido");
        return false;
    } else {
        tel.style.border = "none";
        tel.setCustomValidity("");
        return true;
    }
};
tel.addEventListener("input", Valtel);

const Validardireccion = () => {
    if (!regexLetrasMasNum.test(direc.value)) {
        direc.style.border = " 2px solid red";
        direc.setCustomValidity(`El campo no puede estar vacio o contener  caracteres especiales (para numeros de un digito anteponer cero)`);
        return false;
    } else {
        direc.style.border = "none";
        direc.setCustomValidity("");
        return true;
    }
};
direc.addEventListener("input", Validardireccion);

const ValidaCiudad = () => {
    if (!regexLetras.test(city.value)) {
        city.style.border = " 2px solid red";
        city.setCustomValidity(`El campo no puede estar vacio contener numeros o caracteres especiales`);
        return false;
    } else {
        city.style.border = "none";
        city.setCustomValidity("");
        return true;
    }
};

city.addEventListener("input", ValidaCiudad);

const validaProvincia = () => {
    if (!regexLetras.test(prov.value)) {
        prov.style.border = " 2px solid red";
        prov.setCustomValidity(`El campo no puede estar vacio contener numeros o caracteres especiales`);
        return false;
    } else {
        prov.style.border = "none";
        prov.setCustomValidity("");
        return true;
    }
};
prov.addEventListener("input", validaProvincia);

const ValidaPais = () => {
    if (!regexLetras.test(pais.value)) {
        pais.style.border = " 2px solid red";
        pais.setCustomValidity(`El campo no puede estar vacio contener numeros o caracteres especiales`);
        return false;
    } else {
        pais.style.border = "none";
        pais.setCustomValidity("");
        return true;
    }
};

pais.addEventListener("input", ValidaPais);

// iniciamos la programacion del evento submit
form.addEventListener("submit", (e) => {
    // cancelamos el comportamiento por defecto del formulario
    e.preventDefault();
    
if(e.target){



    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    const DesdePagina = url.get("desdepagina");

    const EdicionFin = () =>  {

        if(e.target.matches(".form_edit") ){
           
           let check = document.createElement("span");
            let parrafoModal = document.createElement("p");
            check.setAttribute("class", "fa-sharp fa-solid fa-check")
            parrafoModal.setAttribute("class", "p_modal-edit");
            parrafoModal.textContent = `Edición Finalizada!! Volviendo al Listado` ;
             let modal = document.getElementById("modal");
             modal.showModal();
             modal.appendChild(check);
             modal.appendChild(parrafoModal);
            
           }
           console.log(DesdePagina);
           return window.location.assign(DesdePagina);    
                   
           }
//dependiendo de donde vengan los datos se actualizan y se regresa nuevamente a la pagina. 
   
if(DesdePagina == "../html/Homb.html") { 


        actualizaDatosH(nombre.value, apellido.value, email.value, sexo.value, edad.value, tel.value, direc.value, city.value, prov.value, pais.value, id)
            .then( () => { 
                

     // si el status es ok al ingresar los datos vuelve a la planilla de datos
                   EdicionFin();
                
               
            })
            .catch(err => console.log(err));
    }else if(sexo == "Femenino"){
       
        // Si por error hay datos femeninos en la tabla de masculinos se puede editar para cambiar el sexo, se envia a la tabla correspondiente y se elimina de la erronea.
        
     function CambioASexoF (nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais) {

         return fetch(`http://localhost:3004/Mujer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais, id })
                })
                .then(res => {

                    if (res.status >= 201 && res.status <= 300) {
                    const modal = document.getElementById("modal");
                    const Exito = document.createElement("p");
                    Exito.textContent = "Datos enviados a la seccion FEMENINO !!";
                    Exito.setAttribute("class", "exito");
                    modal.showModal();

                    setTimeout(() =>{ modal.appendChild(Exito), location.reload(), 100000});
                }
                
            })
            .catch (err => console.log(err))
    }
        CambioASexoF(nombre.value, apellido.value, email.value, sexo, edad.value, tel.value, direc.value, city.value, prov.value, pais.value);

       axios.delete(`http://localhost:3004/Hombre/${id}`)
           .then(res => location.reload())
           .catch(err => console.error(err))
}






     if(DesdePagina == "../html/Muj.html") {
       
        actualizaDatosM(nombre.value, apellido.value, email.value, sexo.value, edad.value, tel.value, direc.value, city.value, prov.value, pais.value, id)
            .then(() => {
 // si el status es ok al ingresar los datos vuelve a la planilla de datos
                 // window.location.href = DesdePagina
                EdicionFin();
               
            }).catch(err => console.log(err));
    }
    else if(sexo == "Masculino"){
           // Si por error hay datos masculinos en la tabla de femenina se puede editar para cambiar el sexo, se envia a la tabla correspondiente y se elimina de la erronea.
        function CambioASexoM(nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais){

        
        return fetch(`http://localhost:3004/Hombre`, {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais, id })
            })
            .then(res => {

                let json = res.data;
               
                           // si el status es ok al ingresar los datos aparece un aviso de que los datos an ingresados correctamente.
                    if (res.status >= 201 && res.status <= 300) {
                        const modal = document.getElementById("modal");
                        const Exito = document.createElement("p");
                        Exito.textContent = "Datos enviados a la seccion Masculino!!";
                        Exito.setAttribute("class", "exito");
                        modal.showModal();

                        setTimeout(() =>{ modal.appendChild(Exito), location.reload(), 100000});
                    }
                    
                })

                .catch(err => console.log(err));
    }

    CambioASexoM(nombre.value, apellido.value, email.value, sexo, edad.value, tel.value, direc.value, city.value, prov.value, pais.value)
    
    axios.delete(`http://localhost:3004/Mujer/${id}`)
           .then(res => location.reload())
           .catch(err => console.error(err))
 }

}else{
      // tambien se cancela el envio del formulario si no se cumplen todas las validaciones
    if (!validaNombre() || !validaApellido() || !validaEmail() || !Elsexo() || !ValidarFecha() || !Valtel() || !Validardireccion() || !ValidaCiudad() || !validaProvincia() || !ValidaPais()) 
        {
           throw new Error(console.log(Error.value));
           return;
        };
  }
});

