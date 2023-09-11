import { loginUser } from "./requests.js"
import { toast } from "./toasti.js";

// Desenvolva as funcionalidades de login aqui

const loginTrue = () => {
    const token = localStorage.getItem("@petinfo:token")

    if(token) {
        location.replace("./src/pages/feed.html")
    }
}

function login() {
    const email = document.querySelector("#Email")
    const senha = document.querySelector("#Senha")
    const botao = document.querySelector("#login__submit")

    const user = {}
    let count = 0

    botao.addEventListener("click", async (event) => {
        event.preventDefault()
        user[email.name] = email.value
        user[senha.name] = senha.value
        if (email.value == "" || senha.value == "") {
            count++
        }
        
        if(count !== 0){
            count = 0
            return toast("preencha os campos obrigatorios", "#db3d5a")
        }else{

        return await loginUser(user)
        }

    })
}

function cadastrar (){
    const cadastrarButton = document.querySelector("#register__button")

    cadastrarButton.addEventListener("click", (event) =>{
      event.preventDefault()
      
      location.replace("./src/pages/register.html")
    })
}


cadastrar()
loginTrue()
login()