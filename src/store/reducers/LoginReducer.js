const initialState = {
    loading: false,
    isLoggedIn: false,
    userDetails: {},
    error: ''
  };
  
  const loginReducer = (state = initialState, action) => {
    const { userDetails } = action;
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return {
          ...state,
          loading: true
        }
      case "LOGIN_DETAILS":
        return {
            ...state,
            isLoggedIn: true,
            userDetails: {
                ...state.userDetails,
                userDetails
            }
        }
      case 'LOGIN_FAILURE':
        return {
          loading: false,
          isLoggedIn: false,
          userDetails: {},
          error: action.payload
        }
    
      default:
        return state;
    }
  };
  
  export default loginReducer;