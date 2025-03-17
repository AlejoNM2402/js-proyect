//Logout button
document.addEventListener('DOMContentLoaded', function() {
    var logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', function() {
        // Eliminar los datos de sesión del localStorage
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('usuarioEmail');
        localStorage.removeItem('isLoggedIn');

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '../index.html'; // Ajusta la ruta según tu estructura de archivos
    });

    // Verificar si el usuario está logueado al cargar la página
    function verificarSesion() {
        var isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (isLoggedIn !== 'true') {
            // Si no hay sesión iniciada, redirigir al login
            window.location.href = '../index.html'; // Ajusta la ruta según tu estructura de archivos
        }
    }

    verificarSesion();
});