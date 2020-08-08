const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  let cart = state.cart;

  switch (action.type) {
    case "ADD_TO_CART":

    return Object.assign({}, state, {
        cart : [...state.cart, action.payload]
      });

    default:
      return state;
  }
};

export default cartReducer;
