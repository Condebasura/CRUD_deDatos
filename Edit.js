const detalleDatosH = (id) =>{
    return fetch(`http://localhost:3004/Hombre/${id} `).then((res)=> res.json()
    )}

    const actualizaDatosH = (nombre, sexo, edad, id) =>{
        return fetch(`http://localhost:3004/Hombre/${id}`,{
            method: "PUT",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({nombre, sexo, edad})
          })
            .then(res => res)
            .catch(err => console.error(err))
    }

    const detalleDatosM = (id) =>{
        return  fetch(`http://localhost:3004/Mujer/${id}`).then((res)=> res.json()
        )}
    
        const actualizaDatosM = (nombre, sexo, edad, id) =>{
            return fetch( `http://localhost:3004/Mujer/${id}`,{
                method: "PUT",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({nombre, sexo, edad})
            })
                .then(res => res)
                .catch(err => console.error(err))
        }

    const form = document.querySelector(".form_edit");

    const obtenerDatos = async ()=>{
        const url = new URL(window.location);
        const id = url.searchParams.get("id");
        const DesdePagina = url.searchParams.get("desdepagina");
      

        if(id == null){
            console.error("Datos no encontrados")
        }
         
        const nombre = document.querySelector("[data-N_Nombre]");
        const sexo = document.querySelector("[data-Nsexo]");
        const edad = document.querySelector("[data-N_edad]");

        if(DesdePagina == "Homb.html"){
        try{
            const perfil = await detalleDatosH(id);
            console.log(perfil);
            if(perfil.nombre && perfil.sexo && perfil.edad){
                nombre.value = perfil.nombre;
                sexo.value = perfil.sexo;
                edad.value = perfil.edad;
            }
          
            else{throw new Error();}
        }catch(err){
            console.error("Catch Error -", err);

        } };

            if(DesdePagina == "Muj.html"){
                try{
                    const perfil = await detalleDatosM(id);
                    console.log(perfil);
                    if(perfil.nombre && perfil.sexo && perfil.edad){
                        nombre.value = perfil.nombre;
                        sexo.value = perfil.sexo;
                        edad.value = perfil.edad;
                    }
                  
                    else{throw new Error();}
                }catch(err){
                    console.error("Catch Error -", err);
            }
    }};

        obtenerDatos();

       


        form.addEventListener("submit", (e) =>{
            e.preventDefault();
            const url = new URL(window.location);
            const id = url.searchParams.get("id");
            const DesdePagina = url.searchParams.get("desdepagina");

            const nombre = document.querySelector("[data-N_Nombre]").value;
        const sexo = document.querySelector("[data-Nsexo]").value;
        const edad = document.querySelector("[data-N_edad]").value;
          if(DesdePagina == "Homb.html"){
            actualizaDatosH(nombre, sexo, edad, id)
           .then(()=>{
                window.location.href = "Homb.html";
            }).catch(err =>console.log(err));
        };

            if(DesdePagina == "Muj.html"){
                actualizaDatosM(nombre, sexo, edad, id)
                .then(()=>{
                     window.location.href = "Muj.html";
                 }).catch(err =>console.log(err));
            }
            
        });

      