import React from 'react'

const AddCategories = ({ show, product, handleClose }) => {

        const { id, images, name, description, stock, price, categories } = product;
        const [state, setState] = useState({
            images: images ? images.map(item => item.id) : [],
            name,
            description,
            stock,
            price,
            categories: categories ? categories.map(item => item.id) : [],
            categoriesToDelete: []
        });
        
        const [allCategories, setCategorias] = useState([]);
    
        async function getCategories() {
            const res = await Axios.get('http://localhost:4000/category')
            //  console.log('resasync_cat', res.data)
            setCategorias(res.data)
            
        }

        useEffect(() => {
            setState({
                images: images ? images.map(item => item.id) : [],
                name,
                description,
                stock,
                price,
                categories: categories ? categories.map(item => item.id) : [],
                categoriesToDelete: []
            });
        }, [product, product.categories, categories,name, description,price,stock,images]);
    
        const handleInput = (e) => {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    
        const handleCategories = (e) => {
            let options = e.target.options;
            let value = [];
            let toDelete = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value * 1);
                } else {
                    toDelete.push(options[i].value * 1);
                }
            }
            setState({
                ...state,
                [e.target.name]: value,
                categoriesToDelete: toDelete
            })
            console.log('estado categories', state)
        }
    return (
        <div>
             <Modal showCat={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Categories</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Form.Control as="select" multiple custom onChange={handleCategories} value={state.categories} name="categories" placeholder="Nombre">
                            {/* {console.log('allcategories', allCategories, 'categories', state.categories)} */}
                            {allCategories && allCategories.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </Form.Control>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                </Modal>
        </div>
    )
}

export default AddCategories
