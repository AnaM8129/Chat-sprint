import { getAllUsers } from "./services.js";
import { URL_USERS } from "./scripts/services.js";
import { getConversations, postNewMessage } from "./servicesMessage.js";
import { renderLastUser, renderAllUsers, renderMessages } from "./ui.js";

const formMessage = document.querySelector("#form-message");
const form = document.querySelector(".aside__form");

document.addEventListener("DOMContentLoaded", async (idUserStart) => {
  const usuarios = await getAllUsers();
  renderLastUser(usuarios);
  renderAllUsers(usuarios);

  const message = await getConversations();
});

/////////////////////////////////////////////Add even listener ///////////////////////////////////////
formMessage.addEventListener("submit", async (e, userId) => {
  e.preventDefault();
  const inputMessage = document.getElementById("input-message");

  const usuarios = await getAllUsers();
  const [lastUser] = usuarios.slice(-1);

  const newConversation = {};

  if (inputMessage.value) {
    const newConversation = {
      idStart: lastUser.id,
      message: inputMessage.value,
      idSendBy: 1,
    };
    console.log(newConversation);
    renderMessages(newConversation);
    await postNewMessage(newConversation);
  }
  formMessage.reset();
  return usuarios;
});

//Capturar el valor del input
form.addEventListener("keyup", async (e) => {
  e.preventDefault();
  const inputSearchValue = document.getElementById("input-search");
  const inputValue = inputSearchValue.value;

  //Condicional que funciona así: si el valor del input existe, llamamos la función que obtiene
  //todos los usuarios y le pasamos como parámetro la url y el valor del input
  //de lo contrario, le pasamos la función que obtiene todos los usuarios sin el parametro del valor del input
  //para que los retorne todos. Es decir, si el usuario no escribe nada, obtenemos todos los usuarios en pantalla.
  if (inputValue) {
    getAllUsers(URL_USERS, inputValue);
  } else {
    getAllUsers();
  }
});
