const btn_ir = document.querySelector(".barra");
const sexo = document.querySelector(".sex_off");
// cambia la clase html para que se vea el desplegable con sus links, tambien cambia el icono de barras al hacer click!
btn_ir.addEventListener("click", (e) => {
    if (sexo.classList.contains("sex_off")) {
           
            sexo.classList.remove("sex_off");
            sexo.classList.add("sex_on");
            btn_ir.classList.remove("barra");
            btn_ir.classList.add("equis");
           
          
            
        
    } else {
            sexo.classList.remove("sex_on");
            sexo.classList.add("sex_off");
            btn_ir.classList.remove("equis");
            btn_ir.classList.add("barra");
            
      
    }

    // si el evento se dispara fuera del elemento cambia la clase html para que no se vea el desplegable con sus links, tambien cambia el icono de barras 
    document.addEventListener("click", (e) => {
        if (e.target != btn_ir) {
            sexo.classList.remove("sex_on");
            sexo.classList.add("sex_off");
            btn_ir.classList.remove("equis");
            btn_ir.classList.add("barra");
            
            
          
        }
    })
});




