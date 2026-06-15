// Base de datos local (Mock API) para Merch y Ropa
const catalogoMerch = [
    { 
        id: 'merch-1', 
        nombre: 'Termo Umbrella Corp', 
        precio: '24.99', 
        img: 'TermoRE.avif', 
        categoria: 'Coleccionables',
        descripcion: 'Mantén tus bebidas a la temperatura ideal mientras sobrevives al apocalipsis zombie. Este termo de acero inoxidable de Umbrella Corporation mantendrá tu café caliente por horas.'
    },
    { 
        id: 'merch-2', 
        nombre: 'Camiseta Bastard', 
        precio: '19.99', 
        img: 'camisetaBastard.jpg', 
        categoria: 'Ropa',
        descripcion: 'Camiseta oficial con diseño único, fabricada 100% en algodón de alta calidad. Ideal para el uso diario de cualquier gamer.'
    },
    { 
        id: 'merch-3', 
        nombre: 'Chaqueta Elden Ring', 
        precio: '89.99', 
        img: 'chaquetaER.webp', 
        categoria: 'Ropa',
        descripcion: 'Conviértete en el Elden Lord con esta chaqueta exclusiva con bordados inspirados en las Tierras Intermedias. Ligera pero abrigadora.'
    },
    { 
        id: 'merch-4', 
        nombre: 'Chaqueta Lookism', 
        precio: '75.50', 
        img: 'chaquetaLookims.jpg', 
        categoria: 'Ropa',
        descripcion: 'Chaqueta con estilo urbano y moderno, perfecta para destacar. Material resistente al viento y al agua.'
    },
    { 
        id: 'merch-5', 
        nombre: 'Chaqueta R.P.D', 
        precio: '110.00', 
        img: 'chaquetaRE.avif', 
        categoria: 'Ropa',
        descripcion: 'Chaqueta oficial del Raccoon Police Department. Incluye los parches bordados auténticos que usó Leon S. Kennedy.'
    },
    { 
        id: 'merch-6', 
        nombre: 'Gorra Umbrella', 
        precio: '15.99', 
        img: 'gorraUmbr.jpg', 
        categoria: 'Ropa',
        descripcion: 'Gorra estilo snapback con el clásico logo de Umbrella Corporation bordado en el frente.'
    },
    { 
        id: 'merch-7', 
        nombre: 'Lámpara Elden Ring', 
        precio: '45.00', 
        img: 'lamparaElden.avif', 
        categoria: 'Coleccionables',
        descripcion: 'Ilumina tu setup con la gracia de la luz de la Gracia. Esta lámpara de escritorio LED es una réplica exacta del juego.'
    },
    { 
        id: 'merch-8', 
        nombre: 'Látigo Castlevania', 
        precio: '120.00', 
        img: 'latigoCastl.jpg', 
        categoria: 'Coleccionables',
        descripcion: 'Réplica de exhibición del famoso látigo de la familia Belmont. No apto para la caza real de vampiros.'
    },
    { 
        id: 'merch-9', 
        nombre: 'Figura MacCree (OW)', 
        precio: '150.00', 
        img: 'macCree.jpg', 
        categoria: 'Coleccionables',
        descripcion: 'Estatua premium de 12 pulgadas pintada a mano. Muestra a Cassidy (MacCree) listo para el combate de mediodía.'
    },
    { 
        id: 'merch-10', 
        nombre: "Estatua Malenia 'Espada de Miquella'", 
        precio: '189.99', 
        img: 'malenia.webp', 
        categoria: 'Coleccionables',
        descripcion: 'Edición limitada de coleccionista. Estatua hiperrealista de Malenia. Incluye base diorama detallada y partes intercambiables.'
    },
    { 
        id: 'merch-11', 
        nombre: 'Mousepad Overwatch', 
        precio: '29.99', 
        img: 'mousepadOW.jpg', 
        categoria: 'Accesorios',
        descripcion: 'Alfombrilla tamaño XL para escritorio completo, con costuras reforzadas y superficie optimizada para sensores ópticos.'
    },
    { 
        id: 'merch-12', 
        nombre: 'Peluche Overwatch', 
        precio: '18.50', 
        img: 'pelucheOW.jpg', 
        categoria: 'Coleccionables',
        descripcion: 'Peluche suave y abrazable oficial de Overwatch. Perfecto compañero para esas largas sesiones de juego competitivo.'
    }
];
