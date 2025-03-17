// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    var formulario = document.getElementById('signinForm');
    var emailInput = formulario.querySelector('input[type="email"]');
    var passwordInput = formulario.querySelector('input[type="password"]');
    
    // Crear un div para mostrar mensajes
    var mensajeDiv = document.createElement('div');
    mensajeDiv.id = 'mensaje';
    mensajeDiv.className = 'mensaje';
    document.body.appendChild(mensajeDiv);
    
    // Agregar estilos para los mensajes si no están en el CSS
    if (!document.querySelector('style#mensajeStyles')) {
        var styleElement = document.createElement('style');
        styleElement.id = 'mensajeStyles';
        styleElement.textContent = `
            .mensaje {
                margin: 15px auto;
                padding: 10px;
                max-width: 80%;
                text-align: center;
                border-radius: 4px;
                display: none;
            }
            .exito {
                background-color: #dff0d8;
                color: #3c763d;
                border: 1px solid #d6e9c6;
            }
            .error {
                background-color: #f2dede;
                color: #a94442;
                border: 1px solid #ebccd1;
            }
            .info {
                background-color: #d9edf7;
                color: #31708f;
                border: 1px solid #bce8f1;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Agregar el evento submit al formulario
    formulario.addEventListener('submit', function(event) {
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
        // Nota: En una API real usaríamos un endpoint específico para autenticación
        fetch(apiUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then(function(usuarios) {
                // Buscar usuario con email y password coincidentes
                var usuarioEncontrado = usuarios.find(function(usuario) {
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
                    setTimeout(function() {
                        window.location.href = 'views/dashboard.html';
                    }, 2000);
                } else {
                    // Credenciales incorrectas
                    mostrarMensaje('Email o contraseña incorrectos', 'error');
                }
            })
            .catch(function(error) {
                mostrarMensaje('Error: ' + error.message, 'error');
                console.error('Error:', error);
            });
    });
    
    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        mensajeDiv.textContent = texto;
        mensajeDiv.className = 'mensaje ' + tipo;
        mensajeDiv.style.display = 'block';
        
        // Posicionar el mensaje después del formulario
        if (formulario.nextSibling) {
            formulario.parentNode.insertBefore(mensajeDiv, formulario.nextSibling);
        } else {
            formulario.parentNode.appendChild(mensajeDiv);
        }
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