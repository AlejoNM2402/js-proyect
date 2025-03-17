// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del DOM
    var formulario = document.getElementById('signinForm');
    var emailInput = formulario.querySelector('input[type="email"]');
    var passwordInput = formulario.querySelector('input[type="password"]');

    // Seleccionar el div del mensaje
    // var mensajeDiv = document.getElementById('messaje');

    // Agregar el evento submit al formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        // Capturar valores del formulario
        var email = emailInput.value.trim();
        var password = passwordInput.value.trim();

        // Validaciones básicas
        if (!email || !password) {
            mostrarMensaje('Por favor, completa todos los campos', 'error');
            return;
        }

        // URL de MockAPI para obtener usuarios
        var apiUrl = "https://67d739dd9d5e3a10152a59b4.mockapi.io/users";

        // Mostrar mensaje de espera
        mostrarMensaje('Verificando credenciales...', 'info');

        // Obtener todos los usuarios para verificar credenciales
        fetch(apiUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then(function (usuarios) {
                // Buscar usuario con email y password coincidentes
                var usuarioEncontrado = usuarios.find(function (usuario) {
                    return usuario.email === email && usuario.password === password;
                });

                if (usuarioEncontrado) {
                    // Login exitoso
                    mostrarMensaje('¡Inicio de sesión exitoso! Redirigiendo...', 'exito');

                    // Guardar información del usuario en localStorage
                    localStorage.setItem('usuarioId', usuarioEncontrado.id);
                    localStorage.setItem('usuarioEmail', usuarioEncontrado.email);
                    localStorage.setItem('isLoggedIn', 'true');

                    // Redireccionar después de 2 segundos
                    setTimeout(function () {
                        window.location.href = 'views/dashboard.html';
                    }, 2000);
                } else {
                    // Credenciales incorrectas
                    mostrarMensaje('Email o contraseña incorrectos', 'error');
                }
            })
            .catch(function (error) {
                mostrarMensaje('Error: ' + error.message, 'error');
                console.error('Error:', error);
            });
    });

    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        // Verificar si el div del mensaje existe
        if (!mensajeDiv) {
            console.error('No se encontró el div con id "messaje".');
            return;
        }

        // Configurar el contenido y la clase del mensaje
        mensajeDiv.textContent = texto;
        mensajeDiv.className = 'messaje ' + tipo; // Añadir la clase correspondiente al tipo
        mensajeDiv.style.display = 'block'; // Mostrar el mensaje

        // Ocultar el mensaje después de 5 segundos
        setTimeout(function () {
            mensajeDiv.style.display = 'none';
        }, 5000);
    }

    // Verificar si ya hay una sesión iniciada
    function verificarSesion() {
        var isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
            // Ya hay sesión iniciada, redirigir al dashboard
            window.location.href = 'views/dashboard.html';
        }
    }

    // Verificar sesión al cargar la página
    verificarSesion();
});