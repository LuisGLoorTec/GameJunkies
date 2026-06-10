document.addEventListener('DOMContentLoaded', () => {
    
    // ====== REGISTRO ======
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('reg-nombre').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            if (password !== confirm) {
                if(window.mostrarToast) window.mostrarToast('Las contraseñas no coinciden', 'error');
                return;
            }
            
            // Obtener usuarios existentes
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            // Verificar si el email ya existe
            const existe = usuarios.find(u => u.email === email);
            if (existe) {
                if(window.mostrarToast) window.mostrarToast('Este correo ya está registrado', 'error');
                return;
            }
            
            // Guardar nuevo usuario
            const nuevoUsuario = { nombre, email, password };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            // Autenticar automáticamente
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
            
            if(window.mostrarToast) window.mostrarToast('Registro exitoso. Redirigiendo...', 'success');
            
            setTimeout(() => {
                window.location.href = 'GameJunkies.html';
            }, 1500);
        });
    }

    // ====== LOGIN PANTALLA COMPLETA ======
    const formLoginFull = document.getElementById('form-login-full');
    if (formLoginFull) {
        formLoginFull.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-full-email').value.trim();
            const password = document.getElementById('login-full-password').value;
            
            iniciarSesion(email, password);
        });
    }

    function iniciarSesion(email, password) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        const usuarioValido = usuarios.find(u => u.email === email && u.password === password);
        
        if (usuarioValido) {
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioValido));
            if(window.mostrarToast) window.mostrarToast('Sesión iniciada correctamente', 'success');
            
            setTimeout(() => {
                window.location.href = 'GameJunkies.html';
            }, 1000);
        } else {
            if(window.mostrarToast) window.mostrarToast('Credenciales incorrectas', 'error');
        }
    }
});
