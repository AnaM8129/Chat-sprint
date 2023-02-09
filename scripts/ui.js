//Redireccionar a la página principal
export let principalPage = "http://127.0.0.1:5500/index.html";
export let time = 5;

export const redireccionar = () => {
  document.location.href = principalPage;
  setTimeout("redireccionar()", time * 1000);
};
