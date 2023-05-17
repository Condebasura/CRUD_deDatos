const RecibeDatos = document.querySelector("[data-recibe]"),

$fragment = document.createDocumentFragment();


  axios.get("http://localhost:3004/Mujer")
  .then(res=>{
      let json = res.data;
console.log(json)

json.forEach(el =>{
  console.log(el)
  let $li = document.createElement("li");
  $li.innerHTML = `${el.nombre}  ---  ${el.sexo} --- ${el.edad} años  <button class="edit">Editar</button>`;
  $fragment.appendChild($li);
  $li.setAttribute("class", "lineas")
})
RecibeDatos.appendChild($fragment)
  })
  .catch(err=> console.error(err))
