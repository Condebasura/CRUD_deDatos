// creacion de variables para los diferentes imputs del formulario
const formulario = document.querySelector(".form");
const form2 = document.querySelector(".form2");
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
let Hombre = document.querySelector("[data-hombre]");
let Mujer = document.querySelector("[data-mujer]");
const btn_submit = document.querySelector(".btnEnv");
const siguiente = document.querySelector(".siguiente");
const atras = document.querySelector(".atras");
// Se crean  RegEx

//  Para emails.
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Para solo letras.
const regexLetras = /[a-z A-Z\\s].+/;

// Para letras y hasta 5 digitos, para direccion.


const regexLetrasMasNum = /^\w+([A-z])\s\w+\w+.{0,5}$/;

// validaciones para el formulario
const validaNombre = () => {
    if (!regexLetras.test(nombre.value)) {
        nombre.style.border = " 2px solid tomato";
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
        apellido.style.border = " 2px solid tomato";
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
    if (!regexEmail.test(email.value)) {
        email.style.border = "2px solid tomato";
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
    if(sexo === "Masculino") {
        sexo = sexo.value;
        return true;
    }
    if (sexo === "Femenino") {
        sexo = sexo.value;
        return true;
    }
    else if (sexo.value == "") {
        return false;
    }

};

sexo.addEventListener("change", Elsexo);

const ValidarFecha = () => {
    const max = new Date().getFullYear('dd/mm/yyyy') + '-12-31';
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
        tel.style.border = "2px solid tomato";
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
        direc.style.border = " 2px solid tomato";
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
        city.style.border = " 2px solid tomato";
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
        prov.style.border = " 2px solid tomato";
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
        pais.style.border = " 2px solid tomato";
        pais.setCustomValidity(`El campo no puede estar vacio contener numeros o caracteres especiales`);
        return false;
    } else {
        pais.style.border = "none";
        pais.setCustomValidity("");
        return true;
    }
};

pais.addEventListener("input", ValidaPais);
// configuramos el boton siguiente y atras

siguiente.addEventListener("click", (e)=>{
    e.preventDefault();
    if(e.target){
      
      form2.style.display = "grid";
      formulario.style.display = "none";

    }
});

atras.addEventListener("click", (e)=>{
    e.preventDefault();
    if(e.target.matches(".atras")){
        form2.style.display = "none";
      formulario.style.display = "grid";
    }
});

// Creamos la programacion de el evento submit
form2.addEventListener("submit", (e) => {
    // cancelamos el comportamiento por defecto 
    e.preventDefault();
   

    // Funcion para cambiar l formato en que el archivo json recibe la fecha, de yyyy/mm/dd a dd/mm/yyyy
    function changeDateFormat(date) {
        const dateParts = date.split('-');
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    };

    //Funcion para agregar los datos al json
    const addDatos = async (nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais) => {

        // ejecuta la funcion que cambia el formato de fecha en edad
        edad = changeDateFormat(edad);

        // dependiendo de que sexo elijas, Masculino / Femenino, se envia a la seccion correspondiente
        try {
           
            
                const res = await fetch(`/Envio`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nombre, apellido, email, sexo, edad, tel, direc, city, prov, pais })
                })
                  const data = await res.json();
                 
                
                // si el status es ok al ingresar los datos aparece un aviso de que los datos an ingresados correctamente.
                if (res.status === 200) {
                    const modal = document.getElementById("modal");
                    const Exito = document.createElement("p");
                    Exito.innerHTML = data.mensaje;
                    Exito.setAttribute("class", "exito");
                    modal.showModal();

                    setTimeout(() => { modal.appendChild(Exito), location.reload(), 100000 });
                    
                }

                else if(res.status === 409){
                    console.log(data.mensaje);
                    const modal = document.getElementById("modal");
                    modal.innerHTML = "";
                    const Exito = document.createElement("p");
                    const salir = document.createElement("i");
                    salir.setAttribute("class", "fas fa-times-circle");
                    Exito.innerHTML = data.mensaje;
                    Exito.setAttribute("class", "noexito");
                    modal.showModal();
                    modal.appendChild(salir);
                    modal.appendChild(Exito);
                    salir.addEventListener("click", (e)=>{
                        if(e.target){
                            modal.close();
                        }
                    })
                }
        } catch (error) {
            return console.log("Error del servidor", error)
        };

        
    };
    
 
    addDatos(nombre.value, apellido.value, email.value, sexo.value, edad.value, tel.value, direc.value, city.value, prov.value, pais.value);
    


    
});



