const { Product, Categories, Image, Users, Order, Orderline, Reviews } = require("./db.js"); // requiring models from Database

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

function orderSeeder() {
    Order.bulkCreate([
        {
            totalprice: 234.54,
            state: 'Cart',
            userdId: 1
        },
        {
            totalprice: 2034.88,
            state: 'Created',
            userdId: 1
        },
        {
            totalprice: 98.45,
            state: 'Canceled',
            userdId: 1
        },
        {
            totalprice: 356.56,
            state: 'Cart',
            userdId: 2
        },
        {
            totalprice: 2356.89,
            state: 'Complete',
            userdId: 2
        },
        {
            totalprice: 3157.98,
            state: 'Processing',
            userdId: 2
        },
        {
            totalprice: 566.76,
            state: 'Created',
            userdId: 3
        },
        {
            totalprice: 123.88,
            state: 'Cart',
            userdId: 3
        },
        {
            totalprice: 543.45,
            state: 'Canceled',
            userdId: 3
        },
        {
            totalprice: 8674.56,
            state: 'Created',
            userdId: 4
        },
        {
            totalprice: 34.89,
            state: 'Canceled',
            userdId: 4
        },
        {
            totalprice: 76534.00,
            state: 'Complete',
            userdId: 4
        },
    ])
}

function orderlinesSeeder() {
    Orderline.bulkCreate([
        {		
            price: 406.8,
            quantity: 9,
            productId: 1,
            orderId: 1	
        },		
        {		
            price: 497.2,
            quantity: 11,
            productId: 2,
            orderId: 5	
        },		
        {		
            price: 587.6,
            quantity: 13,
            productId: 3,
            orderId: 1	
        },		
        {		
            price: 678,
            quantity: 15,
            productId: 7,
            orderId: 1	
        },		
        {		
            price: 178.992,
            quantity: 3.96,
            productId: 8,
            orderId: 2	
        },		
        {		
            price: 278.432,
            quantity: 6.16,
            productId: 14,
            orderId: 2	
        },		
        {		
            price: 377.872,
            quantity: 8.36,
            productId: 12,
            orderId: 10
        },		
        {		
            price: 298.32,
            quantity: 6.6,
            productId: 11,
            orderId: 3	
        },		
        {		
            price: 759.36,
            quantity: 16.8,
            productId: 2,
            orderId: 3	
        },		
        {		
            price: 1301.76,
            quantity: 28.8,
            productId: 3,
            orderId: 3	
        },		
        {		
            price: 1844.16,
            quantity: 40.8,
            productId: 7,
            orderId: 1	
        },		
        {		
            price: 2625.216,
            quantity: 58.08,
            productId: 8,
            orderId: 4	
        },		
        {		
            price: 3221.856,
            quantity: 71.28,
            productId: 14,
            orderId: 4	
        },		
        {		
            price: 3818.496,
            quantity: 84.48,
            productId: 6,
            orderId: 12
        }		
            
    ])
}

function productsSeeder()               //This function create several products
{
    Product.bulkCreate([ 
        {
            name: 'Theraband Resistencia 3',
            description: 'Las bandas de resistencia conocidas como TheraBand por el fabricante pionero, ayudan a los usuarios a rehabilitar lesiones, mejorar la vida funcional, mejorar el rendimiento deportivo. Las TheraBand son fáciles de usar, convenientes', 
            //portables y son una alternativa eficaz a las pesas libres y las máquinas de pesas. Se pueden usar en la clínica, en el hogar o en movimiento. Están disponibles en diferentes niveles codificados por colores de resistencia progresiva según el fabricante, lo que nos posibilita una  documentación fácil del progreso de un nivel al siguiente y ayuda al practicante a progresar a medida que se fortalece.',
            price: 10,
            stock: 50,
        },
        {
            name: 'Banda Circular',
            description: 'La banda circular de Resistencia media es una opción similar a la Theraband pero con diferentes aplicaciones. Esta permite realizar ejercicios de fuerza sin necesidad de mantener el agarre ocupado en la misma', 
            //lo que posibilita incluso usar dicho agarre en otros implementos superficies etc. Tambien tienen diferentes tamaños, colores y resistencias segun el fabricante',
            price: 10,
            stock: 50,
        },
        {
            name: 'Mancuerna engomada 5Kgs',
            description: 'Par de Mancuernas circulares recubiertas de Neoprene de 5 Kgs',
            price: 10,
            stock: 50,
        },
        {
            name: 'Kettlebell 10Kgs',
            description: 'La pesa rusa o kettlebell es una pesa tradicional que consiste de una bola de hierro fundido, semejante a una bala de cañón con un asa. Algunos modelos modernos se caracterizan por contar con pesos ajustables.',
            //Los entrenamientos con pesas rusas aumentan la fuerza, resistencia, agilidad y equilibrio, desafiando tanto la fuerza muscular como el sistema cardiovascular.',
            price: 10,
            stock: 50,
        },
        {
            name: 'Soga de salto con contador',
            description: 'Soga para saltar con contador Digital, material PVC, de logitud 274 cm',
            price: 10,
            stock: 50,
        },
        {
            name: 'Mat Yoga/Pilates 6mm',
            description: 'Yoga Mat Premium 6 mm colores a elección + Bolso Porta Mat NEGRO O CELESTE. Confeccionado con materiales de primera calidad Correa regulable para colgar del hombro.',
            price: 10,
            stock: 50,
        },
        {
            name: 'Mancuerna Engomada 15kg',
            description: 'Mancuerna Hexagonal con recubrimiento de caucho y agarre cromado y corrugado para mejor sugesión.',
            price: 10,
            stock: 50,
        },
        {
            name: 'Cinta motorizada',
            description: 'La "FITAGE GC-273" es una cinta segura, sólida, con un motor de potencia pico 4hpp preparado para correr a 16 km/h reales. 3 niveles de inclinación y diseño ergonómico. MODELO 2020 con Space Just Automático.',
            // MOTOR DC: 4.0 hpp. ANCHO DE BANDA: 42 cm. LARGO DE BANDA: 125 cm. INCLINACIÓN: Manual de 3 niveles. PESO MÁXIMO: 120 kg.'
            price: 10,
            stock: 50,
        },
        {
            name: 'Zapatillas para spinning',
            description: 'Las zapatillas Petra Vr conjugan el uso convencional de una zapatilla con la capacidad de aplicarse en una traba automatica de una bicicleta y es, sobre todo, muy elegida para spinning. Características principales: Talle: 38 (24 cm de plantilla).',
            //Exterior de material sintético de gran calidad traspirable. Cierre con cordones. Posibilidad de incorporar trabas de pedal. Suela de Vibram. Plantilla EVA. Peso aproximado: 405 gr (talles 39-42).',
            price: 10,
            stock: 50,
        },
        {
            name: 'Steps superficie de goma',
            description: 'Marca	GMP. Modelo	Profesional largo. Cantidad de steps para gimnasia 1. Otras características:  Altura 15 cm. Largo x Ancho: 110 cm x 37 cm. Con superficie antideslizante de caucho',
            price: 10,
            stock: 50,
        },
        {
            name: 'Banco plano reforzado',
            description: 'Banco para pecho y abdominales caño reforzado color negro. Tapizado en vinil (color a elección)',
            price: 10,
            stock: 50,
        },
        {
            name: 'Chaleco Running Kalenji',
            description: 'Chaleco rompeviento running Kalenji by decathlon con capucha y Ventilacion. Tejido principal: 100% Poliéster, Tejido de la espalda: 100% Poliéster',
            price: 10,
            stock: 50,
        },
        {
            name: 'Botella Termo 750ml',
            description: 'Termo Erece original 750 ml acero inoxidable doble capa siliconado, modelo sport con cepillo de limpieza, posee gancho para colgarla donde prefieras. Viene en caja. Medida ideal para transportar. Engomado antideslizante.',
            price: 10,
            stock: 50,
        },
        {
            name: 'Bandas De Suspension, TRX',
            description: 'Bandas de suspension profesional para gym fitness entrenamiento funcional etc... Excelente calidad. Incluye bolsa antitraspirante y adaptador para puerta.',
            price: 10,
            stock: 50,
        }
    ])
}

function usersSeeder(){
    Users.bulkCreate([
        {
            name: 'Master',
            lastname: 'Master',
            email: 'master@master.com',
            password: '$2a$10$aZTF9aJ9VVxQeay7RafikuEvwsf87SKy0HhF4zsnPbw7tniAESDEa', //masterpass
            userType: 'admin',
        },
        {
            name: 'Matías',
            lastname: 'Lires',
            email: 'mati@lires.com',
            password: '$2a$10$NbdBSL8O5UY91h8AnWv8w.wVw2U2KLvOUNkOQ34alTc0R/V6x4/BW', //testpass
        },
        {
            name: 'Verónica',
            lastname: 'Jujuy',
            email: 'vero@juju.com',
            password: '$2a$10$4/hynp5ZAKwbxXeZ8gD5EOUKZB0igrdOxRwwR5XwUpK9XwpSIdHrq', //testpass
        },
        {
            name: 'Matías',
            lastname: 'Funes',
            email: 'mati@funes.com',
            password: '$2a$10$NbdBSL8O5UY91h8AnWv8w.wVw2U2KLvOUNkOQ34alTc0R/V6x4/BW', //testpass
        },
        {
            name: 'Test4',
            lastname: 'User',
            email: 'test4@test.com',
            password: '$2a$10$NbdBSL8O5UY91h8AnWv8w.wVw2U2KLvOUNkOQ34alTc0R/V6x4/BW', //testpass
        },
        {
            name: 'Test5',
            lastname: 'User',
            email: 'test5@test.com',
            password: '$2a$10$NbdBSL8O5UY91h8AnWv8w.wVw2U2KLvOUNkOQ34alTc0R/V6x4/BW', //testpass
        },
    ])
}

function categoriesSeeder(){            //This function create several categories
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
            name: 'Maquinarias',
            description: 'Equipos pesados de entrenamiento tales como bicicletas estáticas, cintas para caminar/correr, elípticos, etc.',
        },
        {
            name: 'Accesorios',
            description: 'En esta categoria quedarán agrupados todo aquellos accesorios que son utilizados en diversas categorías deportivas, tales como mochilas, botellas, toallas, etc.',
        }
    ])
}

function reviewsSeeder() {              //This function create several categories
    Reviews.bulkCreate([
        {
            qualification: '2', 
            description: 'Impresentable, he tirado mi plata!|@#~€¬=(¿}]^*)=/%$·$%!ª',
        },
        {
            qualification: '2', 
            description: 'Pesimo en su terminación, no lo recomiendo',
        },
        {
            qualification: '3', 
            description: 'Calidad dudosa, pero no se puede pedir mas por ese precio',
        },
        {
            qualification: '4', 
            description: 'Bastante bueno en su terminación, esperemos que duro',
        },
        {
            qualification: '5', 
            description: 'Excelente, 100% recomendado',
        },
        {
            qualification: '1', 
            description: 'Pésimo, no malgasten su dinero',
        },
        {
            qualification: '2', 
            description: 'Mas malo imposible, me siento robado',
        },
        {
            qualification: '3', 
            description: 'Calidad media, por ese precio podría ser mejor',
        },
        {
            qualification: '4', 
            description: 'Me gusta, cumple su función',
        },
        {
            qualification: '5', 
            description: 'Increible, excelente calidad, recomendado!',
        },
        {
            qualification: '2', 
            description: 'Uffff, que desepcion',
        },
        {
            qualification: '3', 
            description: 'Maso maso',
        },
        {
            qualification: '3', 
            description: 'Calidad standard',
        },
        {
            qualification: '5', 
            description: 'Me encantaaaaa, hermosa y fuerte',
        },
        {
            qualification: '5', 
            description: 'Todo bien 5 puntos',
        },
        {
            qualification: '2', 
            description: 'Un desastre, he malgastado mi plata!|@#~€¬=(¿}]^*)=/%$·$%!ª',
        },
        {
            qualification: '2', 
            description: 'Pesimo en su terminación, no lo recomiendo',
        },
        {
            qualification: '3', 
            description: 'Calidad media, pero no se puede pedir mas por ese precio',
        },
        {
            qualification: '5', 
            description: 'Muy bueno, esperemos que dure',
        },
        {
            qualification: '4', 
            description: 'Excelente producto, 80% recomendado',
        },
        {
            qualification: '2', 
            description: 'Malisimo, no tiren su dinero',
        },
        {
            qualification: '1', 
            description: 'Mas malo no es posible, me siento estafado',
        },
        {
            qualification: '3', 
            description: 'Ahí anda +-, por ese precio no se puede pedir mas',
        },
        {
            qualification: '5', 
            description: 'Me fascina!',
        },
        {
            qualification: '4', 
            description: 'Buena calidad, 100 % recomendado!',
        },
        {
            qualification: '1', 
            description: 'Buee!, roto al segundo día',
        },
        {
            qualification: '3', 
            description: 'Casi le doy 2 pero bueno me atendieron bien',
        },
        {
            qualification: '4', 
            description: 'Calidad optima',
        },
        {
            qualification: '4', 
            description: 'Me gusta, se ve fuerte',
        },
        {
            qualification: '5', 
            description: 'Todo bien! 10 pts',
        },
    ])
}

function reviews_productSeeder() {      // This function create several relationships between reviews and products
    var userid = 1;
    var j = 1;
    for (let i = 1; i < 29; i++) {
        if(userid>6){
            userid=1;
        }
        if(j>14){
            j=1;
        }
        Reviews.update(
            {
                productId: j,
                userId: userid
            },
            {where: {id: i}}
        )
        userid++;
        j++;
    }
}

function categoy_productSederr(){             // This function create several relationships between categories and products
    
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
    categoy_productSederr,
    usersSeeder,
    orderSeeder,
    orderlinesSeeder,
    reviews_productSeeder,
    reviewsSeeder
}
