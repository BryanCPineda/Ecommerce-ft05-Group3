const { Product, Categories, Image } = require("./db.js"); // requiring models from Database

function productsSeeder()   //This function create several products
{
    Product.bulkCreate([ 
        {
            name: 'Theraband Resistencia 3',
            description: 'Las bandas de resistencia conocidas como TheraBand por el fabricante pionero, ayudan a los usuarios a rehabilitar lesiones, mejorar la vida funcional, mejorar el rendimiento deportivo. Las TheraBand son fáciles de usar, convenientes', 
            //portables y son una alternativa eficaz a las pesas libres y las máquinas de pesas. Se pueden usar en la clínica, en el hogar o en movimiento. Están disponibles en diferentes niveles codificados por colores de resistencia progresiva según el fabricante, lo que nos posibilita una  documentación fácil del progreso de un nivel al siguiente y ayuda al practicante a progresar a medida que se fortalece.',
            price: 9.99,
            stock: 111,
        },
        {
            name: 'Banda Circular',
            description: 'La banda circular de Resistencia media es una opción similar a la Theraband pero con diferentes aplicaciones. Esta permite realizar ejercicios de fuerza sin necesidad de mantener el agarre ocupado en la misma', 
            //lo que posibilita incluso usar dicho agarre en otros implementos superficies etc. Tambien tienen diferentes tamaños, colores y resistencias segun el fabricante',
            price: 12.99,
            stock: 100,
        },
        {
            name: 'Mancuerna engomada 5 Kgs',
            description: 'Par de Mancuernas circulares recubiertas de Neoprene de 5 Kgs',
            price: 33.99,
            stock: 53,
        },
        {
            name: 'Kettlebell 10 Kgs',
            description: 'La pesa rusa o kettlebell es una pesa tradicional que consiste de una bola de hierro fundido, semejante a una bala de cañón con un asa. Algunos modelos modernos se caracterizan por contar con pesos ajustables.',
            //Los entrenamientos con pesas rusas aumentan la fuerza, resistencia, agilidad y equilibrio, desafiando tanto la fuerza muscular como el sistema cardiovascular.',
            price: 44.99,
            stock: 42,
        },
        {
            name: 'Soga de salto con contador',
            description: 'Soga para saltar con contador Digital, material PVC, de logitud 274 cm',
            price: 55.50,
            stock: 61,
        },
        {
            name: 'Mat Yoga/Pilates 6 mm',
            description: 'Yoga Mat Premium 6 mm colores a elección + Bolso Porta Mat NEGRO O CELESTE. Confeccionado con materiales de primera calidad Correa regulable para colgar del hombro.',
            price: 45.99,
            stock: 66,
        },
        {
            name: 'Mancuerna Engomada 15 kg',
            description: 'Mancuerna Hexagonal con recubrimiento de caucho y agarre cromado y corrugado para mejor sugesión.',
            price: 77.50,
            stock: 25,
        },
        {
            name: 'Cinta motorizada',
            description: 'La "FITAGE GC-273" es una cinta segura, sólida, con un motor de potencia pico 4hpp preparado para correr a 16 km/h reales. 3 niveles de inclinación y diseño ergonómico. MODELO 2020 con Space Just Automático.',
            // MOTOR DC: 4.0 hpp. ANCHO DE BANDA: 42 cm. LARGO DE BANDA: 125 cm. INCLINACIÓN: Manual de 3 niveles. PESO MÁXIMO: 120 kg.'
            price: 35.90,
            stock: 15,
        },
        {
            name: 'Zapatillas para spinning',
            description: 'Las zapatillas Petra Vr conjugan el uso convencional de una zapatilla con la capacidad de aplicarse en una traba automatica de una bicicleta y es, sobre todo, muy elegida para spinning. Características principales: Talle: 38 (24 cm de plantilla).',
            //Exterior de material sintético de gran calidad traspirable. Cierre con cordones. Posibilidad de incorporar trabas de pedal. Suela de Vibram. Plantilla EVA. Peso aproximado: 405 gr (talles 39-42).',
            price: 78.50,
            stock: 12,
        },
        {
            name: 'Steps superficie de goma',
            description: 'Marca	GMP. Modelo	Profesional largo. Cantidad de steps para gimnasia 1. Otras características:  Altura 15 cm. Largo x Ancho: 110 cm x 37 cm. Con superficie antideslizante de caucho',
            price: 14.50,
            stock: 112,
        },
        {
            name: 'Banco plano reforzado',
            description: 'Banco para pecho y abdominales caño reforzado color negro. Tapizado en vinil (color a elección)',
            price: 14.50,
            stock: 112,
        },
        {
            name: 'Chaleco Running Kalenji',
            description: 'Chaleco rompeviento running Kalenji by decathlon con capucha y Ventilacion. Tejido principal: 100% Poliéster, Tejido de la espalda: 100% Poliéster',
            price: 24.50,
            stock: 14,
        },
        {
            name: 'Botella Termo 750ml ',
            description: 'Termo Erece original 750 ml acero inoxidable doble capa siliconado, modelo sport con cepillo de limpieza, posee gancho para colgarla donde prefieras. Viene en caja. Medida ideal para transportar. Engomado antideslizante.',
            price: 24.50,
            stock: 14,
        },
        {
            name: 'Bandas De Suspension, TRX',
            description: 'Bandas de suspension profesional para gym fitness entrenamiento funcional etc... Excelente calidad. Incluye bolsa antitraspirante y adaptador para puerta.',
            price: 21.99,
            stock: 54,
        }
    ])
}

function categoriesSeeder(){ //This function create several categories

    Categories.bulkCreate([ 
        {
            name: 'Entrenamiento Funcional',
            description: 'Se usan artículos variados propios, de otras actividades, e inclusive elementos no deportivos. Siempre utilizados de tal forma que prevalezca un entrenamiento integral. Ejemplo de ellos son la escalera de coordinación, sogas, TRX, entre otros.',
        },
        {
            name: 'Musculación',
            description: 'Principalmente elementos especiales para el entrenamiento de la fuerza, entre ellos tenemos las barras, discos, bancos etc.',
        },
        {
            name: 'Actividades Fitness',
            description: 'Son implementos destinados a la mejora del cuerpo para entrenar los músculos. Generalmente son actividades aeróbicas o combinaciones de aeróbicas y anaeróbicas. Por ende sus utensilios son ligeros y algunas veces importados de otras actividades.',
        },
        {
            name: 'Pilates y Yoga',
            description: 'Utensilios comunmente utilizados en estas actividades, mats, medias especializadas, ladrillos, etc.',
        },
        {
            name: 'Indumentaria y Calzado',
            description: 'Se incluye en esta categoría la ropa y el calzado especializados para las activadades incluidas en el resto de las categorías',
        },
        {
            name: 'Maquinaria',
            description: 'Equipos pesados de entrenamiento tales como bicicletas estáticas, cintas para caminar/correr, elípticos, etc.',
        },
        {
            name: 'Accesorios',
            description: 'En esta categoria quedarán agrupados todo aquellos accesorios que son utilizados en diversas categorías deportivas, tales como mochilas, botellas, toallas, etc.',
        }

    ])

}
function imageSeeder(){    //This function create several images

    Image.bulkCreate([
        {
            image: "Image 1",
            productId: 1
        },
        {
            image: "Image 2",
            productId: 2
        },
        {
            image: "Image 3",
            productId: 3
        },  
        {
            image: "Image 4",
            productId: 4
        },  
        {
            image: "Image 5",
            productId: 5
        },  
        {
            image: "Image 6",
            productId: 5
        },  
        {
            image: "Image 7",
            productId: 6
        },  
        {
            image: "Image 8",
            productId: 7
        },  
        {
            image: "Image 9",
            productId: 8
        },
    ])

}

function categoy_productSederr(){ // This function create several relationships between categories and products
    

    for (let i = 1; i < 14; i++) {
        Product.findByPk(i)
            .then((product)=>{
                Categories.findByPk(i)
                    .then((category)=>{
                        product.addCategory(category)
                    })
            })
    }

    for (let i = 1; i < 7; i++) {
        Product.findByPk(i)
            .then((product)=>{
                Categories.findByPk(5-i)
                    .then((category)=>{
                        product.addCategory(category)
                    })
            })
        
    }
    
}


module.exports = { // exporting the functions
    productsSeeder,
    categoriesSeeder,
    imageSeeder,
    categoy_productSederr
}