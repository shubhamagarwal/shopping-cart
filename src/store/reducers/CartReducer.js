const initialState = {
  loading: false,
  cart: [],
  error: ''
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return Object.assign({}, state, {
        cart: [...state.cart, action.payload],
      });

    default:
      return state;
  }
};

export default cartReducer;
