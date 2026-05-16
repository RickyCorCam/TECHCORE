// login.js

function login() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    // Usuarios de prueba
    const usuarios = [
        {
            usuario: "admin",
            password: "admin123",
            rol: "administrador"
        },
        {
            usuario: "empleado1",
            password: "empleado123",
            rol: "empleado"
        }
    ];

    // Buscar usuario
    const usuarioEncontrado = usuarios.find(
        user => user.usuario === usuario && user.password === password
    );

    if(usuarioEncontrado){

        // Guardar sesión
        localStorage.setItem("usuario", usuarioEncontrado.usuario);
        localStorage.setItem("rol", usuarioEncontrado.rol);

        // Redirigir
        window.location.href = "menus/index.html";

    } else {
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
}