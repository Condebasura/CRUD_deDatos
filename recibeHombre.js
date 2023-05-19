
const RecibeDatos = document.querySelector("[data-recibe]"),

$fragment = document.createDocumentFragment();



 axios.get("http://localhost:3004/Hombre")
  .then(res=>{
    let json = res.data;


   json.forEach(el =>{
 let  $li = document.createElement("li");
  $li.textContent = `${el.nombre} --- ${el.sexo} --- ${el.edad} años `;
  $li.setAttribute("class", "lineas");
  
 let $btnEdit = document.createElement("a");
  $btnEdit.setAttribute("class", "edit");
  $btnEdit.setAttribute("href", `Editar.html?id=${el.id}`)
$btnEdit.textContent = "Editar";
$li.appendChild($btnEdit);
  $fragment.appendChild($li);

})
RecibeDatos.appendChild($fragment);

  })
  .catch(err=> console.error(err))

