document.addEventListener('DOMContentLoaded', () => {
    
    // ====== DELEGACIÓN GLOBAL DE EVENTOS ======
    document.addEventListener('submit', (e) => {
        // --- Registro Pantalla Completa ---
        if (e.target && e.target.id === 'form-registro') {
            e.preventDefault();
            
            const nombre = document.getElementById('reg-nombre').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            if (password !== confirm) {
                if(window.mostrarToast) window.mostrarToast('Las contraseñas no coinciden', 'error');
                return;
            }
            
            procesarRegistro(nombre, email, password);
        }
        
        // --- Registro Modal Rápido ---
        else if (e.target && e.target.id === 'form-registro-rapido') {
            e.preventDefault();
            
            const nombre = document.getElementById('reg-rapido-nombre').value.trim();
            const email = document.getElementById('reg-rapido-email').value.trim();
            const password = document.getElementById('reg-rapido-password').value;
            const confirm = document.getElementById('reg-rapido-confirm').value;
            
            if (password !== confirm) {
                if(window.mostrarToast) window.mostrarToast('Las contraseñas no coinciden', 'error');
                return;
            }
            
            procesarRegistro(nombre, email, password, true);
        }
        
        // --- Login Pantalla Completa ---
        else if (e.target && e.target.id === 'form-login-full') {
            e.preventDefault();
            
            const email = document.getElementById('login-full-email').value.trim();
            const password = document.getElementById('login-full-password').value;
            
            iniciarSesion(email, password);
        }

        // --- Login Modal Rápido ---
        else if (e.target && e.target.id === 'form-login-rapido') {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            iniciarSesion(email, password, true);
        }
    });

    // Función auxiliar compartida para registrar
    function procesarRegistro(nombre, email, password, esModal = false) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        const existe = usuarios.find(u => u.email === email);
        if (existe) {
            if(window.mostrarToast) window.mostrarToast('Este correo ya está registrado', 'error');
            return;
        }
        
        const nuevoUsuario = { nombre, email, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
        
        if(window.mostrarToast) window.mostrarToast('Registro exitoso', 'success');
        
        if (esModal) {
            const modalEl = document.getElementById('modalRegistro');
            if(modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
            if (window.actualizarNavbarAuth) window.actualizarNavbarAuth();
        } else {
            setTimeout(() => {
                window.location.href = 'GameJunkies.html';
            }, 1000);
        }
    }

    // Función auxiliar compartida para iniciar sesión
    function iniciarSesion(email, password, esModal = false) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        const usuarioValido = usuarios.find(u => u.email === email && u.password === password);
        
        if (usuarioValido) {
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioValido));
            if(window.mostrarToast) window.mostrarToast('Sesión iniciada correctamente', 'success');
            
            if (esModal) {
                const modalEl = document.getElementById('modalLogin');
                if(modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                }
                if (window.actualizarNavbarAuth) window.actualizarNavbarAuth();
            } else {
                setTimeout(() => {
                    window.location.href = 'GameJunkies.html';
                }, 1000);
            }
        } else {
            if(window.mostrarToast) window.mostrarToast('Credenciales incorrectas', 'error');
        }
    }
});
