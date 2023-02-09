export const URL_USERS = " http://localhost:3000/users";

//Obtenemos la data con los usuarios
export const getUsers = async (url) => {
  try {
    const response = await axios.get(URL_USERS);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Realizamos el post de un nuevo usuario
export const postNewUser = async (data) => {
  try {
    const response = await axios.post(URL_USERS, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
