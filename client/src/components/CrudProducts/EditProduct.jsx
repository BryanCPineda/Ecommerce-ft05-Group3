import React, { useState } from 'react'

const EditProduct = (props) => {
  const [prod, setProd] = useState(props.currentProduct)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setProd({ ...prod, [name]: value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        props.updateProd(prod.id, prod)
      }}
    >
      <label>Nombre</label>
      <input
        type="text"
        name="name"
        value={prod.name}
        onChange={handleInputChange}
      />
      <label>Descripcion</label>
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
      <button>Editar Producto</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditProduct