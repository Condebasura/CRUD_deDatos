
const RecibeDatos = document.querySelector("[data-recibe]"),

$fragment = document.createDocumentFragment();



 axios.get("http://localhost:3004/Hombre")
  .then(res=>{
    let json = res.data;
console.log(json)

   json.forEach(el =>{
  let $li = document.createElement("li");
  $li.innerHTML = `${el.nombre} --- ${el.sexo} --- ${el.edad} años `;
  $fragment.appendChild($li);
  $li.setAttribute("class", "lineas");

})
RecibeDatos.appendChild($fragment);


  })
  .catch(err=> console.error(err))


document.addEventListener("DOMContentLoaded", (e)=>{
  e.preventDefault();
  let datos = RecibeDatos.childNodes;
datos.forEach(el =>{
  
})

})