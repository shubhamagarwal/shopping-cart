import axios from "axios";

export const fetchUsersDetails = (username, password) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get(
        `https://xebiascart.herokuapp.com/users?username=${username}&&password=${password}`
      )
      .then((result) => {
        console.log(result);
        if (
          result &&
          result.status === 200 &&
          result.data &&
          result.data.length
        ) {
          dispatch(loginDetails(result && result.data));
        } else {
          dispatch(fetchUsersFailure("Username password invalid"));
        }
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const loginDetails = (userDetails) => {
  return {
    type: "LOGIN_DETAILS",
    userDetails,
  };
};

export const fetchUsersRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};
