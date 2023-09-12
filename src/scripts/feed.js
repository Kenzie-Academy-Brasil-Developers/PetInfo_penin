import { renderAllPosts } from "./render.js"
import { criarPosts, getCurrentUserInfo } from "./requests.js"

async function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");
  const user = await getCurrentUserInfo()
  userAction.addEventListener("click", (e) => {
    const username = document.querySelector(".user__uniquename")

    username.innerText = `@${user.username}`
    menu.classList.toggle("hidden");
  });

  const avatar = document.querySelector(".user__image")

  avatar.src = user.avatar
}

function main() {
 
  const logaltButton = document.querySelector(".logout__button")

  logaltButton.addEventListener("click", (event) => {
    event.preventDefault()
    const token = localStorage.getItem("@petinfo:token")

    if (token) {
      localStorage.clear("@petinfo:token")
      location.replace("../../index.html")
    }

  })
  showUserMenu();
 
  renderAllPosts();
}

main();

const autentication = () => {
  const token = localStorage.getItem("@petinfo:token")

  if (!token) {
    location.replace("../../index.html")
  }
}
autentication()

const createModalPosts = () => {
  const modalDialog = document.querySelector(".post__new");
 
  const divModal = document.createElement("div");
  const divHeader = document.createElement("div");
  const titleModal = document.createElement("h1");
  const buttonClose = document.createElement("button");
  const formInputs = document.createElement("form");
  const titlePost = document.createElement("h2");
  const input = document.createElement("input");
  const titleTextarea = document.createElement("h2");
  const textarea = document.createElement("textarea");
  const divButtons = document.createElement("div");
  const buttonCancel = document.createElement("button");
  const buttonPost = document.createElement("button");
 
  titleModal.innerText = "Criando novo post";
  titleModal.classList.add("modal__title");
  
  buttonClose.innerText = "X";
  buttonClose.setAttribute("id", "closeModal");
  buttonClose.classList.add("button__closeModal");
  
  titlePost.innerText = "Título do post";
  titlePost.classList.add("h2__title");
  
  input.setAttribute("id", "postTitle");
  input.setAttribute("name", "textTitle");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Digite o título aqui...")
  input.classList.add("input__post");
  
  titleTextarea.innerText = "Conteúdo do post";
  titleTextarea.classList.add("h2__title");
  
  textarea.setAttribute("id", "postContent");
  textarea.setAttribute("name", "textContent");
  textarea.setAttribute("type", "text");
  textarea.setAttribute("placeholder", "Desenvolva o conteúdo do post aqui...")
  textarea.classList.add("textarea__post");
  
  buttonCancel.innerText = "Cancelar";
  buttonCancel.setAttribute("id", "cancelModal");
  buttonCancel.classList.add("button__CancelModal");
  
  buttonPost.innerText = "Publicar";
  buttonPost.setAttribute("id", "postModal");
  buttonPost.classList.add("button__postModal");
  
  divModal.classList.add("modal__div");
  
  divHeader.classList.add("modal__header");
  
  formInputs.classList.add("form__post");
  
  divButtons.classList.add("div__buttons");
  
  buttonPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const userPost = {
      title: input.value,
      content: textarea.value
    };
    modalDialog.close();
    location.replace('./feed.html');
    return await criarPosts(userPost);
  })
  
  divHeader.append(titleModal, buttonClose);
  formInputs.append(titlePost, input, titleTextarea, textarea);
  divButtons.append(buttonCancel, buttonPost);
  divModal.append(divHeader, formInputs, divButtons);
  modalDialog.appendChild(divModal);
}

createModalPosts()

const newPost = () => {

  const newPost = document.querySelector("#user__newpost")
  const modalPost = document.querySelector(".post__new")

  newPost.addEventListener("click", () => {
    modalPost.showModal()

    closeModal()
  })

}

const closeModal = () => {
  const buttonClose = document.querySelector("#closeModal");
  const buttonCancel = document.querySelector("#cancelModal");
  const modalContainer = document.querySelector(".post__new")
  const input = document.querySelector('#postTitle')
  const textarea = document.querySelector("#postContent")
  buttonClose.addEventListener("click", () => {
    input.value = "";
    textarea.value = "";
    modalContainer.close();
  });
  buttonCancel.addEventListener("click", () => {
    input.value = "";
    textarea.value = "";
    modalContainer.close();
  });
}
newPost()