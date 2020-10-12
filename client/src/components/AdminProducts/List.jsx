import React from 'react';
import ItemList from './ItemList';
import { Table } from 'react-bootstrap';

function List({ products }) {

    return (
        <Table striped bordered hover responsive size="sm" variant="light">
            <thead>
                <tr className="text-center">
                    <th>Images</th>
                    <th>Title</th>
                    <th>Categories</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
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