import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import Page404 from "./components/Page404";
import Error from "./components/Error";

function App(props) {
  const { userInfo } = props;
  const requireAuth = () => {
    const isLoggedIn = userInfo && userInfo.userDetails && userInfo.userDetails.length ? true : false
    return isLoggedIn;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/product-list"
            render={() => (requireAuth() ? <ProductList /> : <Redirect to="/" />)}
          />
          <Route exact path="/error" component={Error} />
          <Route component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userDetails
  };
};

export default connect(mapStateToProps)(App);
