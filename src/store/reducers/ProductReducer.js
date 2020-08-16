const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FILTER_REQUEST':
        return {
          ...state,
          loading: true
        }
    case "FILTER_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload && action.payload.list,
      };
    case "PRODUCT_FILTER_FAILURE":
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
