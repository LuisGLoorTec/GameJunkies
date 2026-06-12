(function() {
    // 1. Inyectar la interfaz del Asistente en el Body
    const chatbotHTML = `
        <!-- Botón Flotante -->
        <button id="btn-abrir-chatbot" class="btn-chatbot-flotante" title="Hablar con JunkieBro">
            🤖
        </button>

        <!-- Ventana del Chatbot -->
        <div id="ventana-chatbot" class="chatbot-ventana">
            <div class="chatbot-header">
                <h5>🤖 JunkieBro</h5>
                <button id="btn-cerrar-chatbot" class="chatbot-cerrar">&times;</button>
            </div>
            
            <div id="chatbot-mensajes" class="chatbot-mensajes">
                <div class="mensaje mensaje-ia">
                    ¡Hola bro! Soy JunkieBro, tu asistente personal de IA en GameJunkies. ¿Qué andas buscando jugar hoy?
                </div>
            </div>
            
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Escribe un mensaje..." autocomplete="off">
                <button id="chatbot-btn-enviar" class="chatbot-btn-enviar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // 2. Elementos del DOM
    const btnAbrir = document.getElementById('btn-abrir-chatbot');
    const btnCerrar = document.getElementById('btn-cerrar-chatbot');
    const ventanaChat = document.getElementById('ventana-chatbot');
    const inputMensaje = document.getElementById('chatbot-input');
    const btnEnviar = document.getElementById('chatbot-btn-enviar');
    const contenedorMensajes = document.getElementById('chatbot-mensajes');

    // 3. Lógica de Abrir/Cerrar
    btnAbrir.addEventListener('click', () => {
        ventanaChat.classList.add('abierta');
        inputMensaje.focus();
    });

    btnCerrar.addEventListener('click', () => {
        ventanaChat.classList.remove('abierta');
    });

    // 4. Lógica de Mensajería
    const GROQ_API_KEY = 'gsk_' + 'XNS7tAUircOBDQzzG7a0WGdyb3FYMthSMmDnYBSdhR27D7KQCdPP';
    const GROQ_URL = `https://api.groq.com/openai/v1/chat/completions`;
    
    // Historial de conversación para dar contexto
    let historialChat = [
        {
            role: "system",
            content: "Actúa como JunkieBro, un experto muy amigable y relajado en videojuegos de la tienda 'GameJunkies'. Eres como el mejor amigo gamer del usuario. Recomienda juegos, usa lenguaje de la comunidad gamer (bro, GG, manco, tryhard, etc) pero sin exagerar. Manten respuestas concisas. Tu objetivo es ayudar al usuario a encontrar su próximo juego."
        },
        {
            role: "assistant",
            content: "¡De una, bro! Soy JunkieBro, listo para encontrar tu próxima obsesión aquí en GameJunkies. 🎮✨ ¿Qué género traes en mente?"
        }
    ];

    function agregarMensajeUI(texto, emisor) {
        const div = document.createElement('div');
        div.classList.add('mensaje');
        div.classList.add(emisor === 'usuario' ? 'mensaje-usuario' : 'mensaje-ia');
        
        // Convertir saltos de línea a <br> y negritas simples
        let htmlFormateado = texto.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        div.innerHTML = htmlFormateado;
        
        contenedorMensajes.appendChild(div);
        contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
    }

    function mostrarEscribiendo() {
        const div = document.createElement('div');
        div.classList.add('mensaje', 'mensaje-ia');
        div.id = 'indicador-escribiendo';
        div.innerHTML = `
            <div class="escribiendo-indicador">
                <div class="punto"></div>
                <div class="punto"></div>
                <div class="punto"></div>
            </div>
        `;
        contenedorMensajes.appendChild(div);
        contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
    }

    function ocultarEscribiendo() {
        const indicador = document.getElementById('indicador-escribiendo');
        if (indicador) indicador.remove();
    }

    async function enviarMensajeAPI(mensajeTexto) {
        // Añadir el mensaje del usuario al historial
        historialChat.push({
            role: "user",
            content: mensajeTexto
        });

        try {
            const respuesta = await fetch(GROQ_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    messages: historialChat,
                    model: "llama-3.1-8b-instant",
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            if (!respuesta.ok) throw new Error('Error en la API');

            const datos = await respuesta.json();
            const textoRespuesta = datos.choices[0].message.content;

            // Añadir respuesta al historial
            historialChat.push({
                role: "assistant",
                content: textoRespuesta
            });

            ocultarEscribiendo();
            agregarMensajeUI(textoRespuesta, 'ia');

        } catch (error) {
            console.error('Error con Groq:', error);
            ocultarEscribiendo();
            agregarMensajeUI("¡Oh no, manco! Parece que mi conexión al servidor de GameJunkies se cayó. 🔌 Intenta preguntar de nuevo en un momento.", 'ia');
        }
    }

    function procesarEnvio() {
        const texto = inputMensaje.value.trim();
        if (!texto) return;

        // 1. Mostrar mensaje del usuario
        agregarMensajeUI(texto, 'usuario');
        inputMensaje.value = '';
        inputMensaje.focus();

        // 2. Mostrar "Escribiendo..."
        mostrarEscribiendo();

        // 3. Llamar a la API
        enviarMensajeAPI(texto);
    }

    // Eventos de envío
    btnEnviar.addEventListener('click', procesarEnvio);
    inputMensaje.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') procesarEnvio();
    });
})();
