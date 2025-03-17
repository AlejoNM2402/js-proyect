// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    var formulario = document.getElementById('createForm');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    
    // Crear un div para mensajes si no existe
    var mensajeDiv = document.getElementById('mensaje');
    if (!mensajeDiv) {
        mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje';
        mensajeDiv.className = 'mensaje';
        document.body.appendChild(mensajeDiv);
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
        
        // Validar formato de email
        if (!validarEmail(email)) {
            mostrarMensaje('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Crear objeto con datos para la API
        var nuevoUsuario = {
            email: email,
            password: password
        };
        
        // URL de tu mock API - AJUSTA ESTA URL SEGÚN TU CONFIGURACIÓN
        var url = "https://67d739dd9d5e3a10152a59b4.mockapi.io/users";
        
        // Mostrar mensaje de espera
        mostrarMensaje('Procesando registro...', 'info');
        
        // Realizar petición POST para crear usuario
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al crear la cuenta');
            }
            return response.json();
        })
        .then(function(data) {
            // Registro exitoso
            mostrarMensaje('¡Cuenta creada exitosamente! Redirigiendo...', 'exito');
            
            // Guardar el email en localStorage (opcional)
            localStorage.setItem('userEmail', email);
            
            // Esperar 2 segundos antes de redirigir
            setTimeout(function() {
                window.location.href = '../index.html';
            }, 2000);
            
            console.log('Usuario creado:', data);
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
        
        // Hacer visible el mensaje
        mensajeDiv.style.display = 'block';
    }
    
    // Función para validar formato de email
    function validarEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});