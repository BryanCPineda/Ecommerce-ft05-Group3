import React, { useState } from 'react'
import ProductTable from './ProductTable'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'

const CrudShow = () => {
    const productData = [
        { id: 1, name: 'Producto 1', description: 'Este producto es el producto 1', price: 320.00 , stock: 10 },
        { id: 2, name: 'Producto 2', description: 'Este producto es el producto 2', price: 480.00 , stock: 12  },
        { id: 3, name: 'Producto 3', description: 'Este producto es el producto 3', price: 512.00 , stock: 14  },
      ]
    
      const [prods, setProds] = useState(productData)
      const [editing, setEditing] = useState(false)
      const initialFormState = { id: null, name: '', description: '' , price: null, stock: null}
      const [currentProduct, setCurrentProduct] = useState(initialFormState)
    
      const addProduct = (prod) => {
        prod.id = prods.length + 1
        setProds([...prods, prod])
      }

      const deleteUser = (id) => {
        setProds(prods.filter((prod) => prod.id !== id))
      }

      const editRow = (prod) => {
        setEditing(true)
      
        setCurrentProduct({ id: prod.id, name: prod.name, description: prod.description, price: prod.price, stock: prod.stock })
      }

      const updateProd = (id, updatedProd) => {
        setEditing(false)
      
        setProds(prods.map((prod) => (prod.id === id ? updatedProd : prod)))
      }
      
  return (
    <div className="container">
      <div className="flex-row">
      <div className="flex-large">
        {editing ? (
                <div>
                <h2>Editar Producto</h2>
                <EditProduct
                    setEditing={setEditing}
                    currentProduct={currentProduct}
                    updateProd={updateProd}
                />
                </div>
            ) : (
                <div>
                <h2>Agregar Producto</h2>
                <AddProduct addProduct={addProduct} />
                </div>
            )}
        </div>
        <div className="flex-large">
          <h2>Listado de Productos</h2>
          <ProductTable prods={prods} deleteUser={deleteUser} editRow={editRow}/>
        </div>
      </div>
    </div>
  )
}

export default CrudShow
