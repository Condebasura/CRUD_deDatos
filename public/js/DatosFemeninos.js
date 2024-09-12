const RecibeDatos = document.querySelector("[data-recibe]"),
fiter = document.querySelector(".filter"),
formBuscar = document.querySelector(".formFilter"),
modal = document.getElementById("modal"),
  $fragment = document.createDocumentFragment();


// El tr que va dentro de $thead, th que es el encabezado para cada columna de datos 
// datos en version larga...
const $table = document.createElement("table");
const $thead = document.createElement("thead");
const $tr_head = document.createElement("tr");

$table.appendChild($thead);
$thead.appendChild($tr_head);

// se creara el tbody con su tr.
const getDatos = async()=>{

const res =  await axios.get("/Muj/clientesF")
  if(res.status === 200){

  
    const datos = res.data;

   
    // Metodo resumido utilizando for
    const NombColumn = ["Nombre", "Apelido", "Email", "Nacimiento", "Telefono", "Direccion", "Ciudad", "Provincia", "Pais", "Editar", "Eliminar"];
    const loader = document.createElement("div");
    loader.setAttribute("class", "fas fa-circle-notch"); 
    RecibeDatos.appendChild(loader);
   // pie.style.display = "fixed";
    for (let i = 0; i < NombColumn.length; i++) {
      let total = NombColumn[i];
      let th_head = document.createElement("th");
      $tr_head.appendChild(th_head);
      th_head.textContent = total;
    }
    const tbody = document.createElement("tbody");
    $table.appendChild(tbody);

    for(let el of datos) {
     

      let tr = tbody.insertRow();
      let tdNonmb = tr.insertCell();
      let tdApll = tr.insertCell();
      let tdemail = tr.insertCell();
      let tdEdad = tr.insertCell();
      let tdTel = tr.insertCell();
      let tdDirec = tr.insertCell();
      let tdCity = tr.insertCell();
      let tdProv = tr.insertCell();
      let tdPais = tr.insertCell();

      tdNonmb.textContent = el.Nombre;
      tdApll.textContent = el.Apellido;
      tdemail.textContent = el.Email;
      tdEdad.textContent = el.Edad;
      tdTel.textContent = el.Telefono;
      tdDirec.textContent = el.Direccion;
      tdCity.textContent = el.Ciudad;
      tdProv.textContent = el.Provincia;
      tdPais.textContent = el.Pais;
      tr.setAttribute("class", "linea");
      tdNonmb.setAttribute("title", el.Nombre);
      tdApll.setAttribute("title", el.Apellido);
      tdemail.setAttribute("title", el.Email);
      tdEdad.setAttribute("title", el.Edad);
      tdTel.setAttribute("title", el.Telefono);
      tdDirec.setAttribute("title", el.Direccion);
      tdCity.setAttribute("title", el.Ciudad);
      tdProv.setAttribute("title", el.Provincia)
      tdPais.setAttribute("title", el.Pais);
      tbody.appendChild(tr);
        
       
      let Edit = tr.insertCell();
      let Delet = tr.insertCell();
      let $btnEdit = document.createElement("a");
      let $btnDelet = document.createElement("a");
      Edit.setAttribute("title", "Editar");
      Delet.setAttribute("title", "Eliminar");
      Edit.appendChild($btnEdit);
      Delet.appendChild($btnDelet);
      $btnDelet.textContent = "Eliminar";
      $btnEdit.textContent = "Editar";
      $btnDelet.setAttribute("class", "del");
      $btnEdit.setAttribute("class", "edit");
      // creando el ipervinculo al editor con set!!    
      $btnEdit.setAttribute("href", `/Editar?id=${el.Email}&desdepagina=/Muj`);
      formBuscar.addEventListener("submit", (e)=>{
        e.preventDefault();
        
        
          const filtrarCliente = async (fiter)=>{
          
            try{
       
              const res = await fetch("/Muj/clentesF/filter" , {
              method: "POST",
              headers:{ "Content-Type": "application/json",
              },
              body: JSON.stringify({fiter}),
             })
             if(res.ok){
      
              let FiltrerDatos = await res.text();
              const obj = JSON.parse(FiltrerDatos);
              const dataJson = obj.mensaje;
              tr.style.backgroundColor = "rgb(153, 240, 106,0.6)";
               
              setTimeout(() => {
                tr.style.backgroundColor = "white";
               
              },2500);
              let dataApellido = dataJson[0].Apellido;
                
              if(el.Apellido.includes(dataApellido)){
               
                let traerHijo = tr.style.display = "inline-table";
                return traerHijo;
               }else if(!el.Apellido.includes(dataApellido)){
              modal.close();
              let remplazarHijo = tr.style.display = "none";
               return remplazarHijo;
              }
             
             }else if(res.status == 404){
               
               let FiltrerDatos = await res.text();
               const obj = JSON.parse(FiltrerDatos);
               tr.style.backgroundColor = "white";
               let traerHijo = tr.style.display = "inline-table";
                traerHijo;
                modal.innerHTML = "Cliente no encontrado !!";
                modal.showModal();
                
             }
            
             
            }
            
            catch(err){
              console.log(err);
             } 
            }
            filtrarCliente(fiter.value);
      });

      
      // programamos el ipervinculo de eliminacion
      $btnDelet.addEventListener("click", async (e) => {
        e.preventDefault();
        try{

        
        if (e.target.matches(".del")) {
          const res = await fetch("/Muj/delete",{
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify({Email: el.Email}),
          });
          const datos = await res.json();

          let modal = document.getElementById("modal");
          let parrafo = document.createElement("h2");
          let cajaBtn = document.createElement("div");
          let aceptar = document.createElement("button");
          let cancelar = document.createElement("button");
          parrafo.setAttribute("class", "p_delete");
        cajaBtn.setAttribute("class", "cajabtn");
          aceptar.setAttribute("class", "aceptar");
          cancelar.setAttribute("class", "cancelar");
          parrafo.innerHTML = `Se va a eliminar de su lista el cliente: <h1>${el.Nombre} ${el.Apellido}</h1>`;
          aceptar.textContent = "Aceptar";
          cancelar.textContent = "Cancelar";
          modal.showModal();
          modal.innerHTML = "";
          modal.appendChild(parrafo);
          cajaBtn.appendChild(aceptar);
          cajaBtn.appendChild(cancelar);
          modal.appendChild(cajaBtn);

            aceptar.addEventListener("click", async (e) => {
               e.preventDefault();
               try{
                let id = datos;
                let Email = id.Email;
                let modalDelete = document.getElementById("modal");
                let parrafoDelete = document.createElement("p");
                parrafoDelete.innerHTML = `El cliente ${el.Nombre} ${el.Apellido} fue eliminado con exito`;
                modalDelete.showModal();
                modalDelete.innerHTML = "";
                setTimeout(() => { modalDelete.appendChild(parrafoDelete), location.reload(), 100000 });  
                  await fetch(`/Muj/delete/${Email}`,{
                     method: "DELETE",
                   }); 
               }catch(error){
                console.log("Error al enviar la solicitud DELETE", error);
               }
             
              });
              
          cancelar.addEventListener("click", () => {
            modal.close();
          })
        }
      }catch(err){
        console.log(err.message)
      }
      })


      $fragment.appendChild($table);


    }
    RecibeDatos.removeChild(loader);
  

    RecibeDatos.appendChild($fragment);
  }


  
};

getDatos();

