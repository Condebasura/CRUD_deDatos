const detalleDatos = (id) =>{
    return fetch(`http://localhost:3004/Hombre/${id} `).then((res)=> res.json()
    )}

    const actualizaDatos = (nombre, sexo, edad, id) =>{
        return fetch(`http://localhost:3004/Hombre/${id}`,{
            method: "PUT",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({nombre, sexo, edad})
            .then(res => res)
            .catch(err => console.error(err))
        });
    }

    const form = document.querySelector(".form_edit");

    const obtenerDatos = async ()=>{
        const url = new URL(window.location);
        const id = url.searchParams.get("id");

        if(id == null){
            console.error("Datos no encontrados")
        }

        const nombre = document.querySelector("[data-N_Nombre]");
        const sexo = document.querySelector("[data-Nsexo]");
        const edad = document.querySelector("[data-N_edad]");
        try{
            const perfil = await detalleDatos(id);
            console.log(perfil);
            if(perfil.nombre && perfil.sexo && perfil.edad){
                nombre.value = perfil.nombre;
                sexo.value = perfil.sexo;
                edad.value = perfil.edad;
            }
            else{throw new Error();}
        }catch(err){
            console.error("Catch Error -", err);

        }};

        obtenerDatos();

        