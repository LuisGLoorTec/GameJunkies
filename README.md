# GameJunkies - E-Commerce de Videojuegos

**Instituto Superior Tecnológico Liceo Cristiano**
**Carrera:** Tecnología Superior En Desarrollo De Software
**Asignatura:** Lenguaje Frontend
**Ciclo:** I - 2025 | **Parcial:** Segundo
**Integrantes:** Bruno Quiroz, Luis Gordillo (Cuarto Semestre)

---

## Descripción del Proyecto
**GameJunkies** es una plataforma web e-commerce orientada exclusivamente al sector gaming que busca centralizar y resolver la fragmentación del mercado. La aplicación web permite a los usuarios comprar videojuegos, adquirir ropa y coleccionables (Merchandising), y participar en un novedoso sistema de subastas en vivo, todo en un solo ecosistema y bajo un diseño "dark mode" altamente inmersivo y profesional.

**Problemática que resuelve:** Actualmente es difícil encontrar una sola página web que englobe todos los aspectos de la cultura gamer (juegos digitales, mercancía física y subastas). GameJunkies unifica estos servicios.

---

## Tecnologías Utilizadas
El proyecto cumple estrictamente con los requerimientos técnicos de la materia, prescindiendo del uso de frameworks JS como React o Angular:
- **Estructura:** HTML5 Semántico
- **Estilos y Diseño:** CSS3 Puro (Variables, Flexbox, CSS Grid) y Bootstrap 5
- **Interactividad y Lógica:** JavaScript Vanilla (ES6+)
- **Almacenamiento Local:** Window `localStorage` (Simulación de Base de Datos y CRUD)
- **Consumo de APIs Externas:** 
  - **RAWG Video Games Database API** (Catálogo principal de juegos)
  - **Groq API (Llama 3)** (Chatbot y Asistente Virtual)
- **DiceBear API** (Generación dinámica de avatares)
- **Librerías Visuales:** Animate On Scroll (AOS), Google Material Symbols, SweetAlert2.

---

## Funcionalidades Principales (15/15)
1. Menú hamburger responsive.
2. Sistema de pestañas (Perfil y Subastas).
3. Modo oscuro/claro interactivo.
4. Scroll suave (Smooth Scrolling) en navegación.
5. Carrusel de imágenes con controles.
6. Búsqueda avanzada con filtros combinados.
7. Galería fotográfica con Lightbox.
8. Buscador en tiempo real de videojuegos vía API.
9. Modales y Pop-ups dinámicos.
10. Dropdown predictivo de sugerencias de búsqueda.
11. Notificaciones Toast globales personalizadas.
12. Sistema de comentarios y reseñas de usuarios.
13. **Sistema CRUD Completo (LocalStorage):** Gestión de Carrito de Compras, Historial de Pedidos y Lista de Favoritos (Añadir, Mostrar, Actualizar, Eliminar).
14. Animaciones de entrada dinámicas al hacer scroll (AOS).
15. Conexión nativa con Inteligencia Artificial (Llama 3 vía Groq) para atención al cliente.

---

## Instrucciones de Instalación y Ejecución
Dado que el proyecto utiliza tecnologías frontend puras (Client-side), su ejecución es extremadamente sencilla:

1. **Descomprimir:** Extrae el archivo `.zip` proporcionado.
2. **Ejecutar Localmente:**
   - La forma más sencilla es utilizar la extensión **Live Server** en Visual Studio Code.
   - Haz clic derecho sobre el archivo `index.html` ubicado en la raíz del proyecto.
   - Selecciona `Open with Live Server`.
   - Alternativamente, puedes simplemente hacer doble clic en el archivo `index.html` para abrirlo en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
3. **Uso de la Aplicación:**
   - Puedes simular la compra de artículos, probar los filtros del catálogo o hacer pujas en las subastas.
   - La información del usuario y del carrito se guardará en la memoria de tu navegador (`localStorage`).
   - El asistente virtual IA funciona de manera local utilizando la API Key configurada.

---

## Créditos y Recursos Externos
- **Diseño UI/UX y Desarrollo Frontend:** Bruno Quiroz, Luis Gordillo.
- **Catálogo de Juegos:** Proporcionado por la API pública de [RAWG.io](https://rawg.io/apidocs).
- **Iconografía:** [Google Material Symbols](https://fonts.google.com/icons).
- **Avatares Dinámicos:** [DiceBear API](https://www.dicebear.com/).
- **Inteligencia Artificial:** Modelo `Llama 3` vía la API de [Groq](https://groq.com/).
- **Recursos Gráficos Extra:** Tenor (GIFs animados).
