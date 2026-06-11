// Función para cargar el Navbar dinámicamente
function cargarNavbar() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-custom py-3 fixed-top">         
        <div class="container-fluid px-4">             
            <a class="navbar-brand d-flex align-items-center" href="GameJunkies.html">                 
                <span>GAME</span><span class="marca-resaltada">JUNKIES</span>             
            </a>                          
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPrincipal" aria-controls="navbarPrincipal" aria-expanded="false" aria-label="Toggle navigation">                 
                <span class="navbar-toggler-icon navbar-toggler-icon-custom"></span>             
            </button>                          
            <div class="collapse navbar-collapse" id="navbarPrincipal">                 
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center ms-4">                                          
                    <li class="nav-item"><a class="nav-link" href="Catalogo.html">Catálogo</a></li>                     
                    <li class="nav-item"><a class="nav-link" href="Subastas.html">Subastas</a></li>                     
                    <li class="nav-item"><a class="nav-link" href="Perfil.html">Perfil</a></li>                     
                </ul>             
                
                <div class="d-flex align-items-center position-relative me-4">
                    <input type="text" id="input-buscador" class="form-control input-busqueda" placeholder="Buscar juego..." autocomplete="off" style="min-width: 250px;">                                                  
                    <button id="btn-buscar" class="btn btn-principal ms-2">Buscar</button>                                                  
                    <ul id="lista-sugerencias" class="list-group position-absolute w-100 shadow" style="top: 100%; left: 0; display: none; z-index: 1050; max-height: 400px; overflow-y: auto; margin-top: 5px;">                         
                    </ul> 
                </div>

                <div class="d-flex gap-2 align-items-center">
                    <button id="btn-tema" class="btn btn-tema-custom rounded-circle" title="Cambiar Tema" style="width: 40px; height: 40px; display:flex; align-items:center; justify-content:center;">
                        🌓
                    </button>
                    <button type="button" class="btn btn-secundario" data-bs-toggle="modal" data-bs-target="#modalLogin">Iniciar Sesión</button>
                    <button type="button" class="btn btn-principal" data-bs-toggle="modal" data-bs-target="#modalRegistro">Registrarse</button>
                    <button class="btn btn-outline-warning ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCarrito" id="btn-mini-carrito">🛒 (0)</button>
                </div>
            </div>         
        </div>     
    </nav>
    <div style="height: 80px;"></div> <!-- Espaciador -->

    <!-- Modal Login Rápido -->
    <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="modalLoginLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content custom-modal">
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold" id="modalLoginLabel">Iniciar Sesión Rápido</h5>
                    <button type="button" class="btn-close btn-close-custom" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-login-rapido">
                        <div class="mb-3">
                            <label for="login-email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control input-busqueda" id="login-email" placeholder="usuario@ejemplo.com" required>
                        </div>
                        <div class="mb-4">
                            <label for="login-password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control input-busqueda" id="login-password" placeholder="********" required>
                        </div>
                        <button type="submit" class="btn btn-principal w-100 mb-3">Ingresar</button>
                    </form>
                    <div class="text-center text-muted">
                        ¿No tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#modalRegistro" data-bs-dismiss="modal" class="text-decoration-none" style="color: var(--color-principal);">Regístrate aquí</a>
                        <br><br>
                        <a href="Login.html" class="text-decoration-none" style="font-size: 0.85rem; color: var(--texto-apagado);">Ir a pantalla completa de login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Registro Rápido -->
    <div class="modal fade" id="modalRegistro" tabindex="-1" aria-labelledby="modalRegistroLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content custom-modal">
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold" id="modalRegistroLabel">Únete a GameJunkies</h5>
                    <button type="button" class="btn-close btn-close-custom" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-registro-rapido">
                        <div class="mb-3">
                            <label for="reg-rapido-nombre" class="form-label">Nombre Completo</label>
                            <input type="text" class="form-control input-busqueda" id="reg-rapido-nombre" placeholder="Ej: Juan Pérez" required>
                        </div>
                        <div class="mb-3">
                            <label for="reg-rapido-email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control input-busqueda" id="reg-rapido-email" placeholder="usuario@ejemplo.com" required>
                        </div>
                        <div class="mb-3">
                            <label for="reg-rapido-password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control input-busqueda" id="reg-rapido-password" placeholder="Mínimo 6 caracteres" required minlength="6">
                        </div>
                        <div class="mb-3">
                            <label for="reg-rapido-confirm" class="form-label">Confirmar Contraseña</label>
                            <input type="password" class="form-control input-busqueda" id="reg-rapido-confirm" placeholder="Repita la contraseña" required minlength="6">
                        </div>
                        <button type="submit" class="btn btn-principal w-100 mb-3">Crear Cuenta</button>
                    </form>
                    <div class="text-center text-muted">
                        ¿Ya tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#modalLogin" data-bs-dismiss="modal" class="text-decoration-none" style="color: var(--color-principal);">Inicia Sesión aquí</a>
                        <br><br>
                        <a href="Registro.html" class="text-decoration-none" style="font-size: 0.85rem; color: var(--texto-apagado);">Ir a pantalla completa de registro</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mini Carrito Offcanvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCarrito" aria-labelledby="offcanvasCarritoLabel" style="background-color: var(--panel-oscuro); color: var(--texto-principal);">
        <div class="offcanvas-header border-bottom" style="border-color: var(--borde-sutil) !important;">
            <h5 class="offcanvas-title fw-bold" id="offcanvasCarritoLabel">Tu Carrito</h5>
            <button type="button" class="btn-close btn-close-custom" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
            <div id="mini-carrito-items" class="flex-grow-1 overflow-auto">
                <!-- Se llenará dinámicamente -->
                <div class="text-center py-5 text-muted">Tu carrito está vacío</div>
            </div>
            <div class="mt-auto border-top pt-3" style="border-color: var(--borde-sutil) !important;">
                <div class="d-flex justify-content-between mb-3">
                    <span class="fw-bold fs-5">Subtotal:</span>
                    <span class="fw-bold fs-5 text-precio" id="mini-carrito-total">$0.00</span>
                </div>
                <a href="Carrito.html" class="btn btn-principal w-100 py-2 fw-bold">Proceder al Pago</a>
            </div>
        </div>
    </div>
    `;

    // Inyectar al principio del body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Contenedor para Notificaciones Toast
    const toastContainerHTML = `
    <div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastContainerHTML);
}

// Función global para mostrar notificaciones Toast (Funcionalidad #11)
window.mostrarToast = function (mensaje, tipo = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toastId = 'toast-' + Date.now();
    let borderClass = 'toast-info';
    let icon = 'ℹ️';

    if (tipo === 'success') {
        borderClass = 'toast-success';
        icon = '✅';
    } else if (tipo === 'error') {
        borderClass = 'toast-error';
        icon = '❌';
    }

    const toastHTML = `
        <div id="${toastId}" class="toast toast-custom ${borderClass} mb-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex align-items-center">
                <div class="toast-body d-flex align-items-center gap-2">
                    <span style="font-size: 1.2rem;">${icon}</span>
                    <span>${mensaje}</span>
                </div>
                <button type="button" class="btn-close me-3 m-auto btn-close-custom" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cargarNavbar();

    // Lógica para Modo Claro / Oscuro
    const btnTema = document.getElementById('btn-tema');

    // Revisar si hay un tema guardado
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'claro') {
        document.body.classList.add('light-mode');
        btnTema.textContent = '🌙'; // Icono para volver a oscuro
    } else {
        btnTema.textContent = '☀️'; // Icono para volver a claro
    }

    // Evento de click para alternar
    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('tema', 'claro');
            btnTema.textContent = '🌙';
            mostrarToast('Modo claro activado', 'success');
        } else {
            localStorage.setItem('tema', 'oscuro');
            btnTema.textContent = '☀️';
            mostrarToast('Modo oscuro activado', 'success');
        }
    });

    // Comprobar sesión activa al cargar la página
    actualizarNavbarAuth();
});

// Función para actualizar visualmente el navbar
function actualizarNavbarAuth() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    const btnLogin = document.querySelector('[data-bs-target="#modalLogin"]');
    const btnRegistro = document.querySelector('[data-bs-target="#modalRegistro"]');
    
    if (usuarioActual && btnLogin && btnRegistro) {
        const parent = btnLogin.parentElement;
        
        let authContainer = document.getElementById('auth-logged-in');
        if (!authContainer) {
            authContainer = document.createElement('div');
            authContainer.className = 'd-flex align-items-center gap-2';
            authContainer.id = 'auth-logged-in';
            
            // Buscar primero el botón de mini carrito (el offcanvas)
            const carrito = document.getElementById('btn-mini-carrito') || document.querySelector('.navbar a[href="Carrito.html"]');
            
            if (carrito && parent.contains(carrito)) {
                parent.insertBefore(authContainer, carrito);
            } else {
                parent.appendChild(authContainer);
            }
        }
        
        authContainer.innerHTML = `
            <span class="text-white me-2 fw-bold">Hola, ${usuarioActual.nombre.split(' ')[0]}</span>
            <a href="Perfil.html" class="btn btn-outline-light btn-sm">Mi Perfil</a>
            <button id="btn-logout" class="btn btn-danger btn-sm">Salir</button>
        `;
        
        btnLogin.style.display = 'none';
        btnRegistro.style.display = 'none';
        
        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('usuarioActual');
            window.location.reload();
        });
    }
}
