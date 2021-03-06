import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {  useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { fetchUsersDetails } from '../store/actions/LoginAction';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [ validationFlag, setValidationFlag] = useState(false)
  const { fetchUsersDetails, userDetails } = props;
  const history = useHistory();

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  useEffect(() => {
    if(userDetails && userDetails.isLoggedIn) {
      history.push("/product-list");
      setValidationFlag(false)
    } else if (userDetails && userDetails.error !== '') {
      setValidationFlag(true)
    } else {
      //
    }
  },[history, userDetails])

  const handleSubmit = (event) => {
    fetchUsersDetails(username, password);
    event.preventDefault();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        {validationFlag ? (<div>Username Or Password Invalid.</div>) : ''}
          <Button
            id="signIn"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

Login.defaultProps = {
  userInfo: {}
}

Login.propTypes = {
  userInfo: PropTypes.shape({})
}

const mapStateToProps = (state) => {
  return {
    userDetails : state.user
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchUsersDetails: (username, password) => {
        dispatch(fetchUsersDetails(username, password));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
