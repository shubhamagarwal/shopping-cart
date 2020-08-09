const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT_LIST':
            return {
                ...state,
                products: action.payload && action.payload.list
            };
        default: 
            return state;
    }
  
};

export default productReducer;
