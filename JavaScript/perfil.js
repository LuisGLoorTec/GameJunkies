document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar si hay sesión iniciada
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuarioActual) {
        // Redirigir si no hay sesión
        window.location.href = 'Login.html';
        return;
    }

    // 2. Cargar datos en la UI
    const inputNombre = document.getElementById('perfil-nombre');
    const inputEmail = document.getElementById('perfil-email');
    const sidebarNombre = document.getElementById('sidebar-nombre');
    const avatarImg = document.getElementById('avatar-img');

    if (inputNombre) inputNombre.value = usuarioActual.nombre;
    if (inputEmail) inputEmail.value = usuarioActual.email;
    if (sidebarNombre) sidebarNombre.textContent = usuarioActual.nombre.split(' ')[0]; // Solo primer nombre
    
    // Generar avatar bonito usando DiceBear o cargar la foto guardada
    if (avatarImg) {
        if (usuarioActual.avatar) {
            avatarImg.src = usuarioActual.avatar;
        } else {
            const seed = encodeURIComponent(usuarioActual.email);
            avatarImg.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=121212`;
        }
    }

    // 2.5 Lógica para cambiar foto de perfil (Base64)
    const inputAvatar = document.getElementById('input-avatar');
    if (inputAvatar) {
        inputAvatar.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // Validar que sea una imagen y tamaño razonable (ej. máx 2MB)
            if (!file.type.startsWith('image/')) {
                if (window.mostrarToast) window.mostrarToast('Por favor, sube un archivo de imagen válido.', 'error');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                if (window.mostrarToast) window.mostrarToast('La imagen es demasiado grande (Máximo 2MB).', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                
                // Actualizar imagen visualmente
                if (avatarImg) avatarImg.src = base64String;
                
                // Guardar en objeto y localStorage
                usuarioActual.avatar = base64String;
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

                // Actualizar en el array global
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                const index = usuarios.findIndex(u => u.email === usuarioActual.email);
                if (index !== -1) {
                    usuarios[index] = usuarioActual;
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                }

                if (window.mostrarToast) window.mostrarToast('Foto de perfil actualizada.', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    // 3. Lógica para guardar cambios
    const formPerfil = document.getElementById('form-editar-perfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            const nuevoNombre = document.getElementById('perfil-nombre').value.trim();
            const nuevaPass = document.getElementById('perfil-password').value;
            const confirmPass = document.getElementById('perfil-confirm-password').value;

            // Validar contraseñas si el usuario escribió algo
            if (nuevaPass !== '') {
                if (nuevaPass.length < 6) {
                    if (window.mostrarToast) window.mostrarToast('La nueva contraseña debe tener al menos 6 caracteres', 'error');
                    return;
                }
                if (nuevaPass !== confirmPass) {
                    if (window.mostrarToast) window.mostrarToast('Las contraseñas no coinciden', 'error');
                    return;
                }
            }

            // Actualizar objeto usuarioActual
            usuarioActual.nombre = nuevoNombre;
            if (nuevaPass !== '') {
                usuarioActual.password = nuevaPass;
            }

            // Guardar sesión activa
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

            // Actualizar la base de datos global de usuarios
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const index = usuarios.findIndex(u => u.email === usuarioActual.email);
            
            if (index !== -1) {
                usuarios[index] = usuarioActual;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }

            // Actualizar interfaz visualmente
            if (sidebarNombre) sidebarNombre.textContent = nuevoNombre.split(' ')[0];
            
            // Limpiar inputs de contraseña
            document.getElementById('perfil-password').value = '';
            document.getElementById('perfil-confirm-password').value = '';

            // Notificar éxito
            if (window.mostrarToast) {
                window.mostrarToast('Datos guardados correctamente', 'success');
            }
            
            // Actualizar Navbar por si cambió el nombre
            if (window.actualizarNavbarAuth) {
                window.actualizarNavbarAuth();
            }
        });
    }

    // 4. Lógica para eliminar cuenta
    const btnEliminar = document.getElementById('btn-eliminar-cuenta');
    if (btnEliminar) {
        btnEliminar.addEventListener('click', () => {
            if (confirm("¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer y perderás tu historial de compras.")) {
                
                // Remover de la base de datos global
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios = usuarios.filter(u => u.email !== usuarioActual.email);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                
                // Eliminar sesión
                localStorage.removeItem('usuarioActual');
                
                if (window.mostrarToast) {
                    window.mostrarToast('Cuenta eliminada. Hasta pronto.', 'success');
                }
                
                // Redirigir al inicio después de un segundo
                setTimeout(() => {
                    window.location.href = window.location.pathname.includes('/HTML/') ? '../index.html' : 'index.html';
                }, 1500);
            }
        });
    }
});
