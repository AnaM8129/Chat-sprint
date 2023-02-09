// import { URL_USERS } from "./services.js";
import { postNewUser, URL_USERS, getUsers } from "./services.js";

//Cuando el documento haya cardgado por completo, que ejecute lo siquiente...
document.addEventListener("DOMContentLoaded", async () => {
  await getUsers();
});
const form = document.getElementById("form");
//Escuchar el evento del form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //Accedemos a todos los elementos del form con la propiedad object
  const formElements = Object.values(form);
  //Creamos un objeto vacío que contendrá un nuevo usuario
  const newUser = {};

  //Recorremos cada elemento del form
  formElements.forEach((input) => {
    //Si el objeto tiene un id
    if (input.id) {
      //creamos una nueva propiedad a new user que es el id del input
      newUser[input.id] = input.value;
    }
  });
  //Creamos una bandera para la validación que comienza en true
  let noEmpty = true;
  //Recorremos el objeto con un for in
  for (const propiedad in newUser) {
    const valueProperty = newUser[propiedad];
    //Si el campo de texto está vacío, la bandera se torna a false y lanza una alertas
    if (!valueProperty) {
      noEmpty = false;

      Swal.fire({
        title: "Vacío!",
        text: "Diligencia los campos que faltan",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }
  //Si todos los campos están llenos, lanza una alerta de exitoso
  if (noEmpty) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Exitoso!",
      text: "Has creado una nueva cuenta",
      showConfirmButton: false,
      timer: 2000,
    });
    //Esta propiedad nos permite dirigirnos a la página principal cinco segundos luego de haber llenado el formulario
    setTimeout(function () {
      location.href = "http://127.0.0.1:5500/index.html";
    }, 1000 * 5);
    //Esperamos que todo el proceso anterior se realice para realizar el post del nuevo usuario
    console.log(newUser);
    await postNewUser(newUser);
    form.reset();
  }
});
