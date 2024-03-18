
const RecibeDatos = document.querySelector("[data-recibe]"),

  fragment = document.createDocumentFragment();

// El tr que va dentro de $thead, th que es el encabezado para cada columna de datos 
// datos en version larga...
const $table = document.createElement("table");
const $thead = document.createElement("thead");
const $tr_head = document.createElement("tr");


$table.appendChild($thead);
$thead.appendChild($tr_head);


// se creara el tbody con su tr.

axios.get("Homb")
  .then(res => {
  const json = res.data;
const obj = JSON.stringify(json)
   console.log(obj);
    // Creamos las columnas cabecera de los datos que se van a ingresar utilizando for.
    const NombColumn = ["Nombre", "Apelido","email", "Sexo", "Nacimiento", "Telefono", "Direccion", "Ciudad", "Provincia", "Pais", "Editar", "Eliminar"];
   
    for (let i = 0; i < NombColumn.length; i++) {
      let total = NombColumn[i];
      let th_head = document.createElement("th");

      $tr_head.appendChild(th_head);
      th_head.textContent = total;
    }
    const tbody = document.createElement("tbody");
    $table.appendChild(tbody);

    json.forEach(el => {
      

      let tr = tbody.insertRow();
      let tdNonmb = tr.insertCell();
      let tdApll = tr.insertCell();
      let tdemail = tr.insertCell();
      let tdSexo = tr.insertCell();
      let tdEdad = tr.insertCell();
      let tdTel = tr.insertCell();
      let tdDirec = tr.insertCell();
      let tdCity = tr.insertCell();
      let tdProv = tr.insertCell();
      let tdPais = tr.insertCell();

      tdNonmb.textContent = el.nombre;
      tdApll.textContent = el.apellido;
      tdemail.textContent = el.email;
      tdSexo.textContent = el.sexo;
      tdEdad.textContent = el.edad;
       tdTel.textContent = el.tel;
       tdDirec.textContent = el.direc;
       tdCity.textContent = el.city;
       tdProv.textContent = el.prov;
       tdPais.textContent = el.pais;
      tr.setAttribute("class", "linea");
      tbody.appendChild(tr);
    
      
     let Edit = tr.insertCell();
       let Delet = tr.insertCell();
       let $btnEdit = document.createElement("a");
       let $btnDelet = document.createElement("a");
       Edit.appendChild($btnEdit);
       Delet.appendChild($btnDelet);
      $btnDelet.textContent = "Eliminar";
      $btnEdit.textContent = "Editar";
      $btnDelet.setAttribute("class", "del");
      $btnEdit.setAttribute("class", "edit");
      // creando el ipervinculo al editor con set!!    
       $btnEdit.setAttribute("href", `/Editar?id=${el.id}&desdepagina=/Homb`);
          // programamos el ipervinculo de eliminacion
       $btnDelet.addEventListener("click", (e)=>{
      e.preventDefault();
      if(e.target.matches(".del")){
        let modal = document.getElementById("modal");
        let parrafo = document.createElement("h2");
        let cajaBtn = document.createElement("div");
        let aceptar = document.createElement("button");
        let cancelar = document.createElement("button");
        parrafo.setAttribute("class", "p_delete");
        cajaBtn.setAttribute("class", "cajabtn");
        aceptar.setAttribute("class", "aceptar");
        cancelar.setAttribute("class", "cancelar");
        parrafo.innerHTML = `Se va a eliminar de su lista el cliente:<h1> ${el.nombre} ${el.apellido}</h1>`;
        aceptar.textContent = "Eliminar";
        cancelar.textContent = "Cancelar";
        modal.showModal();
        modal.innerHTML = "";
        modal.appendChild(parrafo);
        cajaBtn.appendChild(aceptar);
        cajaBtn.appendChild(cancelar);
        modal.appendChild(cajaBtn);
        if(aceptar){
          aceptar.addEventListener("click",()=>{

            axios.delete(`Homb/${el.id}`)
            .then(res => location.reload())
            .catch(err => console.error(err))
          })
          
        }
        cancelar.addEventListener("click",()=>{
          modal.close();
        })
      
      
      }
    })

    
       fragment.appendChild($table);


    })
    RecibeDatos.appendChild(fragment);


  })
  .catch(err => console.error(err));



