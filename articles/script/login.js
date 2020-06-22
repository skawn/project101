let user = document.getElementById("user")
let pass = document.getElementById("pass")
let error = document.getElementById("err")
let loginbtn = document.getElementById("loginbtn")

user.value = "admin@gmail.com"
pass.value = "12345"

loginbtn.addEventListener("click",e => {
    let _username = user.value
    let _password = pass.value
    if(_username == '') user.style.border = "1px solid red"
    else if(_password == '') pass.style.border = "1px solid red"
    else {
        user.style.border = "1px solid rgba(0, 0, 0, 0.1)"
        pass.style.border = "1px solid rgba(0, 0, 0, 0.1)"
        request.login(_username,_password,error)
    } 
})


