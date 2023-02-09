export const URL_MESSAGES = "http://localhost:3000/conversations";

export const getConversations = async (idUserStart) => {
  try {
    const { data } = await axios.get(URL_MESSAGES, idUserStart);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postNewMessage = async () => {
  try {
    const { data } = await axios.post(URL_MESSAGES);

    return data;
  } catch (error) {
    console.log(error);
  }
};
