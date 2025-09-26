const usuario = document.getElementById('username');
const password = document.getElementById('password');
const btnLogin = document.querySelector('.btn-login');

function VerificaAdmin(e) {
    e.preventDefault(); // impede o form de recarregar a página

    const usuarioValue = usuario.value.trim();
    const passwordValue = password.value.trim();

    if (usuarioValue === "admin" && passwordValue === "1234") {
        window.open("admin.html", "_blank");

        usuario.value = "";
        password.value = "";
    } else {
        alert("Usuário ou senha inválidos!");

        usuario.value = "";
        password.value = "";
    }
}

btnLogin.addEventListener('click', VerificaAdmin);