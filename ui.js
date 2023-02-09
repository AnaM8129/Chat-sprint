import { getUserId } from "./services.js";
import { URL_MESSAGES } from "./servicesMessage.js";

export const navContainer = document.querySelector(".aside__nav");
export const containerAllUsers = document.querySelector(".aside__section");
const containerUser = document.querySelectorAll(".aside__section-container");
const navContainerMain = document.querySelector(".main__nav");
const messagesContainer = document.getElementById("messages-container");

//Constante para pintar la foto y nombre en la parte superior del último usuario que haya realizado
//el formulario de entrada.
export const renderLastUser = async (data) => {
  //Con el método slice-1 accedemos al último usuario de la data.
  let [lastUser] = data.slice(-1);
  console.log(lastUser);
  //Desestructuramos el objeto para obtener las dos propiedades que necesitamos: imagen (avatar) y nombre.
  let imageUser = lastUser["avatar"];
  // console.log(imageUser);

  //Desestructuramos el objeto para obtener las dos propiedades que necesitamos: imagen (avatar) y nombre.
  let nameUser = lastUser["name"];
  // console.log(nameUser);

  //Pintamos el ultimo usuario
  navContainer.innerHTML = `
    <figure class="aside__nav-figure">
            <img
              class="aside__nav-img"
              src="${imageUser}"
              alt="user"
            />
          </figure>
          <p class="aside__nav-p">${nameUser}</p>
    `;
  return lastUser;
};

//Función para pintar todos los usuarios en la parte izquierda.
export const renderAllUsers = async (data, user) => {
  containerAllUsers.innerHTML = "";
  data.forEach((user) => {
    containerAllUsers.innerHTML += `
    <div class="aside__section-container" data-id=${user.id}>
    <figure class="aside__section-figure" data-id=${user.id}>
      <img
        class="aside__section-img"
        src="${user.avatar}"
        alt="chat-user"
        data-id=${user.id}
     
      />
    </figure>
    <div class="aside__section-container2" data-id=${user.id}>
      <p class="aside__section-name" data-id=${user.id}>${user.name}</p>
      <p class="aside__section-message" data-id=${user.id}>Último mensaje</p>
    </div>
  </div>
    `;
  });
};

//Escuchar el evento click de cada usuario.
containerAllUsers.addEventListener("click", async (e) => {
  //Validando que al dar click a cualquier parte del contenedor, ejecute la función que le damos
  if (
    e.target.classList.contains("aside__section-container") ||
    e.target.classList.contains("aside__section-figure") ||
    e.target.classList.contains("aside__section-img") ||
    e.target.classList.contains("aside__section-container2") ||
    e.target.classList.contains("aside__section-name") ||
    e.target.classList.contains("aside__section-message")
  ) {
    //A cada propiedad del contenedor de usuario le damos una propiedad personalizada llamada
    //data id que contiene el id de cada usuario.
    const userId = e.target.getAttribute("data-id");
    console.log(userId);

    //A partir del id, creamos una constante en services que nos permite capturar todo el elemento que pertenece a ese id.
    const response = await getUserId(userId);
    console.log(response.data);

    renderBigUser(response);

    return userId;
  }
});

const renderBigUser = (response, data) => {
  navContainerMain.innerHTML = `
  <figure class="main__nav-figure">
  <img
    class="main__nav-img"
    src="${response.data.avatar}"
    alt="user"
  />
</figure>
<div class="main__container">
  <p class="main__container-name">${response.data.name}</p>
  <p class="main__container-line">En línea</p>
</div>
  `;
};

export const renderMessages = (usuarios) => {
  const messagesContainer = document.getElementById("messages-container");

  messagesContainer.innerHTML += `
 <article>${usuarios.message}</article> `;
};
