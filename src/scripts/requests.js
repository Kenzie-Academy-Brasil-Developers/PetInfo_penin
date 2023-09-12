import { toast } from "./toasti.js";

const crieteHedres = () => {
  const token = localStorage.getItem("@petinfo:token")

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
  return headers
}

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};


export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}


export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}



export async function loginUser(user) {
  const requestLogin = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
    .then(async (response) => {
      const responseJson = await response.json()
      const smallEmail = document.querySelector("#wrong-email")
      const smallPassword = document.querySelector("#wrong-password")
      if (response.ok) {

        localStorage.setItem("@petinfo:token", responseJson.token)

        toast("seu login deu certo", "#087d5a")
        setTimeout(() => {

          location.replace("./src/pages/feed.html")
        }, 1000)

      } else {
        toast(responseJson.message, "#c83751")
        if (responseJson.message === "O email está incorreto") {

          smallEmail.classList.remove("hidden");
          smallPassword.classList.add("hidden");
        } else if (responseJson.message === "A senha está incorreta") {

          smallPassword.classList.remove("hidden");
          smallEmail.classList.add("hidden");

        }
      }

    })
  return requestLogin;
}

export async function cadastreUser(user) {
  const requestCad = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
    .then(async (response) => {


      if (response.ok) {



        alert("seu cadastro deu certo")
        location.replace("../../index.html")


      } else {
        alert("algo deu errado", "#c83751")
      }

    })
  return requestCad;
}

export async function criarPosts(user) {
  const requestPost = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: crieteHedres(),
    body: JSON.stringify(user)
  })
    .then(async (response) => {
      const convert = await response.json()

      if (response.ok) {
        alert("post criado")
        return convert
      } else {
        alert(convert.message)
      }
    })
  return requestPost
}

export const postsCriado = async () => {
  const posts = await fatch(`${baseUrl}/posts`, {
    method: "GET",
    headers: crieteHedres()
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("não foi possivel postar no momento")
      }
    })

  return posts

}

export const postById = async (postId) => {
  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "GET",
    headers: crieteHedres()
  })
    .then(async (response) => {
      const convert = await response.json()

      if (response.ok) {
        return convert
      } else {
        alert(convert.message)
      }

    })

  return post
}

export const updatePostById = async (postId, postBody) => {
  const postUpdate = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "PATCH",
    headers: crieteHedres(),
    body: JSON.stringify(postBody)
  })
    .then(async (response) => {
      const convert = await response.json()

      if (response.ok) {
        alert("post atualizado com sucesso")

        return convert
      } else {
        alert(convert.message)
      }
    })

}

export const deletPostById = async (postId) => {
  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: crieteHedres()
  })
    .then(async (response) => {
      const convert = await response.json()

      if (response.ok) {
        alert(convert.message)

        return convert
      } else {
        alert(convert.message)
      }
    })
  return post
}

