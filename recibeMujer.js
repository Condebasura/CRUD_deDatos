const RecibeDatos = document.querySelector("[data-recibe]"),

$fragment = document.createDocumentFragment();


  axios.get("http://localhost:3004/Mujer")
  .then(res=>{
      let json = res.data;


json.forEach(el =>{
  
  let $li = document.createElement("li");
  // creando el ipervinculo al editor en el innerHTML!
  $li.innerHTML = `${el.nombre}  ---  ${el.sexo} --- ${el.edad} años  <a  href= Editar.html?id=${el.id}&desdepagina=Muj.html class="edit">Editar</a>`;
  $fragment.appendChild($li);
  $li.setAttribute("class", "lineas")
})
RecibeDatos.appendChild($fragment)
  })
  .catch(err=> console.error(err))


 

    