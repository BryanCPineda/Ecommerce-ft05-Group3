import Axios from 'axios';

const RELOAD_PRODUCT_CARD = 'RELOAD_PRODUCT_CARD';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const DELETE_IMAGE_PRODUCT = 'DELETE_IMAGE_PRODUCT'
const ADD_CATEGORY_TO_PRODUCT = "ADD_CATEGORY_TO_PRODUCT";
const DELETE_CATEGORY_TO_PRODUCT = 'DELETE_CATEGORY_TO_PRODUCT';
const ADD_IMAGE = 'ADD_IMAGE'
const GET_PRODUCT = 'GET_PRODUCT';


// trae los prooductos de la base de datos y los ordena por id--------------------------

export function reloadProductCard() {
        return dispatch => {
                dispatch({type: RELOAD_PRODUCT_CARD})
    }
}

export function getProducts() { 
    return dispatch => {
       return Axios.get("http://localhost:4000/products")
        .then( res => res.data)
        .then( res => {console.log('en actions', res)
            const prod = res.rows.sort(function (a, b) {
                    if (a.id > b.id) {
                    return 1;
                    }
                    if (a.id < b.id) {
                    return -1;
                    }
                    return 0;
                })

            dispatch({ type: GET_PRODUCTS, payload: prod})}
        ) }}

        
export function getProductById(id){
    return dispatch => {
        return Axios.get("http://localhost:4000/products/"+id)
            .then(res => res.data)
            .then(res => {
                dispatch ({type: GET_PRODUCT_BY_ID, payload: res})
            })
    }
}


 export function createProduct(prod) {
     return dispatch => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

            const prodEnviar = {
              name: prod.name,
              description: prod.description,
              price: prod.price,
              stock: prod.stock,
              categories: "",
              images: "",
            };
        
    return Axios.post("http://localhost:4000/products", prodEnviar, config)
     .then( res => res.data)
     .then( res =>
        dispatch({ type: CREATE_PRODUCT, payload: res})
     )
          }
        }

export function updateProduct(id, prod) {
    return dispatch => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

            const prodEnviar = {
                name: prod.name,
                description: prod.description,
                price: prod.price,
                stock: prod.stock,
                categories:'',
                images: ''
        }
        
        return Axios.put('http://localhost:4000/products/'+id, prodEnviar, config)
            .then((res) =>
                 dispatch({ type: UPDATE_PRODUCT, payload: res})
            )
        }
}

export function deleteProduct(id) {
    return dispatch => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

    return Axios.delete('http://localhost:4000/products/'+id, config)
            .then((res) =>
            dispatch({ type: DELETE_PRODUCT, payload: res})
            )

  }}

export function deleteImageToProduct(id) {
    return dispatch => {
    
        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

    return Axios.delete('http://localhost:4000/image/'+id, config)
        .then((res) =>
                dispatch({ type: DELETE_IMAGE_PRODUCT, payload: res})
                )
        
    } 
}

export function deleteCategoryToProduct(cat, id) {
    return dispatch => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }
                        
    return Axios.delete('http://localhost:4000/products/'+id+'/category/'+cat, config)
        .then((res) =>
            dispatch({ type: DELETE_CATEGORY_TO_PRODUCT, payload: res})
            )
               
    }
}

export function agregarImagen(id, imagen){
    return dispatch => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

    const imgEnviar = {
        productId: id,
        image: imagen
    }

      return Axios.post('http://localhost:4000/image', imgEnviar, config) 
      .then((res) =>
      dispatch({ type: ADD_IMAGE, payload: res})
      )
    
  } 
}

export function addCategoryToProduct(cat, id) {
    return dispatch => {
                        
        const config = {
            headers: {
              "Content-type": "Application/json"
            }
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

    return Axios.post('http://localhost:4000/products/'+id+'/category/'+cat, config)
        .then((res) =>
        dispatch({ type: ADD_CATEGORY_TO_PRODUCT, payload: res}))
                        
        }}

