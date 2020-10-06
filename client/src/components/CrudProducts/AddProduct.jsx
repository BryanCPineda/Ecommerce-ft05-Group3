import React, { useState } from 'react'

const AddProduct = (props) => {
  const initialFormState = { id: null, name: '', description: '' , price: null, stock: null}
  const [prod, setProd] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setProd({ ...prod, [name]: value })
  }

  return (
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    if (!prod.name || !prod.description) return

                    props.addProduct(prod)
                    setProd(initialFormState)
                }}
            >
            <label>Nombre</label>
            <input
                type="text"
                name="name"
                value={prod.name}
                onChange={handleInputChange}
            />
            <label>Descripción</label>
            <input
                type="text"
                name="description"
                value={prod.description}
                onChange={handleInputChange}
            />
            <label>Precio</label>
            <input
                type="text"
                name="price"
                value={prod.price}
                onChange={handleInputChange}
            />
            <label>Stock</label>
            <input
                type="text"
                name="stock"
                value={prod.stock}
                onChange={handleInputChange}
            />
            <button>Agregar Producto</button>
            </form>
  )
}

export default AddProduct