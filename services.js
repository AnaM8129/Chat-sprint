import { URL_USERS } from "./scripts/services.js";
import { getUsers } from "./scripts/services.js";
import { renderAllUsers } from "./ui.js";

//Constante para capturar todos los usuarios
export const getAllUsers = async (url, inputValue = "") => {
  try {
    const { data } = await axios.get(URL_USERS);
    //Constante para hacer el filtrado de búsqueda. Funciona así: si el valor del input existe
    //entoces realiza un filtro a la lista de usuarios de su propiedad name convertida a minuscula
    //que incluya el valor del input, de lo contrario que retorne toda la lista de usuarios
    const userFilter = inputValue
      ? data.filter((user) =>
          user.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : data;
    //Llamamos la función que pinta los usuarios, pero le pasamos la contante de filtro
    //para que solo retorne los usuarios que coincidan con la búsqueda.
    renderAllUsers(userFilter);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Constante para capturar todo el elemento que pertenece al id del usuario. Es llamada en iu.
export const getUserId = async (userId) => {
  try {
    //Response contiene la url de usuarios y realizamos un endpoint asignandole el id de cada usuario.
    const response = await axios(`${URL_USERS}/${userId}`);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
