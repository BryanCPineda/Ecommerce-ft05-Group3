import React from 'react'

const ProductTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {props.prods.length > 0 ? (
        props.prods.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.name}</td>
            <td>{prod.description}</td>
            <td>{prod.price}</td>
            <td>{prod.stock}</td>
            <td>
                <button
                    onClick={() => {
                        props.editRow(prod)
                    }}
                    className="button muted-button"
                    >
                    Editar
                    </button>
                <button
                    onClick={() => props.deleteUser(prod.id)}
                    className="button muted-button"
                    >
                    Borrar
                </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No prods</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default ProductTable