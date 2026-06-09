// Función para cargar el Navbar dinámicamente
function cargarNavbar() {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-custom py-3 fixed-top">         
        <div class="container-fluid px-4">             
            <a class="navbar-brand text-white d-flex align-items-center" href="GameJunkies.html">                 
                <span>GAME</span><span class="marca-resaltada">JUNKIES</span>             
            </a>                          
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPrincipal" aria-controls="navbarPrincipal" aria-expanded="false" aria-label="Toggle navigation">                 
                <span class="navbar-toggler-icon" style="filter: invert(1);"></span>             
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
                    <button id="btn-tema" class="btn btn-outline-light rounded-circle" title="Cambiar Tema" style="width: 40px; height: 40px; display:flex; align-items:center; justify-content:center;">
                        🌓
                    </button>
                    <a class="btn btn-secundario" href="Login.html">Iniciar Sesión</a>
                    <a class="btn btn-principal" href="Registro.html">Registrarse</a>
                    <a class="btn btn-outline-warning ms-2" href="Carrito.html">🛒 (0)</a>
                </div>
            </div>         
        </div>     
    </nav>
    <div style="height: 80px;"></div> <!-- Espaciador -->
    `;

    // Inyectar al principio del body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
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
        } else {
            localStorage.setItem('tema', 'oscuro');
            btnTema.textContent = '☀️';
        }
    });
});
