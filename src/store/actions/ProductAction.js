import axios from 'axios'

export const saveProductList = (list) => {
    return {
        type: 'ADD_PRODUCT_LIST',
        payload: {
            list
        }
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
      //dispatch(fetchUsersRequest())
        axios.all([
            axios.get('https://xebiascart.herokuapp.com/products'),
            axios.get(`https://xebiascart.herokuapp.com/filters`),
        ])
        .then((result) => {
        
        //setFilters(result && result[1] && result[1].data)
        dispatch(saveProductList(result && result[0] && result[0].data));
        
        })
        .catch(error => {
          //dispatch(fetchUsersFailure(error.message))
        })
    }
  }