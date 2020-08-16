import axios from 'axios'

export const fetchFilterProduct = () => {
  return {
    type: 'FETCH_FILTER_REQUEST'
  }
}

export const saveProductList = (list) => {
    return {
        type: 'FILTER_PRODUCT_SUCCESS',
        payload: {
            list
        }
    }
}

export const filterFailure = error => {
  return {
    type: 'PRODUCT_FILTER_FAILURE',
    payload: error
  }
}

export const handleProductFilter = (filterDetails) => {
  const  { brand, color, rating } = filterDetails;
  const endPoint = `https://xebiascart.herokuapp.com/products?brand=${brand}`;
  console.log('myname,', filterDetails, endPoint, brand, color, rating)
    return (dispatch) => {
      dispatch(fetchFilterProduct())
      axios
      .get(endPoint)
      .then((result) => {
        dispatch(saveProductList(result && result.data));
      })
      .catch((error) => {
        dispatch(filterFailure(error.message))
      });
    }
  }