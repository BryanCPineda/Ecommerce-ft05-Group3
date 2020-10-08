const { Product, Categories, Image } = require("./db.js");


function productsSeeder()
{
    Product.bulkCreate([
        {
            name: 'Product 1',
            description: 'description product 1',
            price: 11111,
            stock: 111,
        },
        {
            name: 'Product 2',
            description: 'description product 2',
            price: 22222,
            stock: 222,
        },
        {
            name: 'Product 3',
            description: 'description product 3',
            price: 33333,
            stock: 333,
        },
        {
            name: 'Product 4',
            description: 'description product 4',
            price: 44444.00,
            stock: 444,
        },
        {
            name: 'Product 5',
            description: 'description product 5',
            price: 5555.00,
            stock: 555,
        },
        {
            name: 'Product 6',
            description: 'description product 6',
            price: 6666.00,
            stock: 666,
        },
        {
            name: 'Product 7',
            description: 'description product 7',
            price: 7777.00,
            stock: 777,
        },
        {
            name: 'Product 8',
            description: 'description product 8',
            price: 8888.00,
            stock: 888,
        },
        {
            name: 'Product 9',
            description: 'description product 9',
            price: 9999.00,
            stock: 999,
        },
        {
            name: 'Product 10',
            description: 'description product 10',
            price: 100000.00,
            stock: 1010,
        }
    ])

}

function  categoriesSeeder(){

    Categories.bulkCreate([
        {
            name: 'Category 1',
            description: 'description category 1',
        },
        {
            name: 'Category 2',
            description: 'description category 3',
        },
        {
            name: 'Category 3',
            description: 'description category 3',
        },
        {
            name: 'Category 4',
            description: 'description category 4',
        },
        {
            name: 'Category 5',
            description: 'description category 5',
        },
        {
            name: 'Category 6',
            description: 'description category 6',
        }

    ])

}
function  imageSeeder(){    

    Image.bulkCreate([
        {
            image: "Image 1",
            productId: 1
        },
        {
            image: "Image 11",
            productId: 1
        },
        {
            image: "Image 111",
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
            image: "Image 33",
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
            image: "Image 55",
            productId: 5
        },  
    ])

}


module.exports = {
    productsSeeder,
    categoriesSeeder,
    imageSeeder
}