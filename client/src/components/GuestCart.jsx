export const constructor = () => {
        if(!localStorage.getItem('carrito')){
            localStorage.setItem('carrito','[]')
        }
    }

export const getCarrito = JSON.parse(localStorage.getItem('carrito'))

export const addItemCarrito = (item) => {
    getCarrito.push(item)
    localStorage.setItem('carrito', JSON.stringify(getCarrito))
}

 


