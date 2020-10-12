import React from 'react';
import ItemList from './ItemList';
import { Table } from 'react-bootstrap';

function List({ products }) {

    return (
        <Table striped bordered hover responsive size="sm" variant="light">
            <thead>
                <tr className="text-center">
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Categorías</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item, index) => (
                    <ItemList key={index} product={item} />
                ))}
            </tbody>
        </Table>
    )
}

export default List