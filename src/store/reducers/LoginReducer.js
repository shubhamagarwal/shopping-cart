const initialState = {
    userDetails: {}
  };
  
  const loginReducer = (state = initialState, action) => {
    const { userDetails } = action;
    switch (action.type) {
      case "LOGIN_DETAILS":
  
      return {
          ...state,
          userDetails: {
              ...state.userDetails,
              userDetails
          }
      }
  
      default:
        return state;
    }
  };
  
  export default loginReducer;