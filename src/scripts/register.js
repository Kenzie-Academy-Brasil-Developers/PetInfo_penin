import { cadastreUser } from "./requests.js"
import { toast } from "./toasti.js"
// Desenvolva as funcionalidades de cadastro aqui
function cadaster() {

    const user = document.querySelector("#user")
    const email = document.querySelector("#Email")
    const picture = document.querySelector("#picture")
    const Senha = document.querySelector("#Senha")
    const registerSubmit = document.querySelector("#register__submit")
    

    const cadastro = {}
    let count = 0


    registerSubmit.addEventListener("click", async (event) => {
        event.preventDefault()
        cadastro[user.name] = user.value
        cadastro[email.name] = email.value
        cadastro[picture.name] = picture.value
        cadastro[Senha.name] = Senha.value
        
        if (email.value == "" || Senha.value == "" || user.value == "" || picture == "") {
            count++
        }

        if (count !== 0) {
            count = 0
            return alert("preencha os campos obrigatorios")
        } else {

            return await cadastreUser(cadastro)
        }
    })
}

function backToLogin (){
    const cadastrarButton = document.querySelector("#redirect__button")

    cadastrarButton.addEventListener("click", (event) =>{
      event.preventDefault()
      
      

          location.replace("../../index.html")
     
    })
}
backToLogin()
cadaster()