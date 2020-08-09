import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function App(props) {
  const { userInfo } = props;
  const requireAuth = () => {
    return userInfo && userInfo.userDetails && userInfo.userDetails.length;
  };

  const Login = lazy(() => import("./components/Login"));
  const ProductList = lazy(() => import("./components/ProductList"));
  const Header = lazy(() => import("./components/Header"));
  const Page404 = lazy(() => import("./components/Page404"));
  const Error = lazy(() => import("./components/Error"));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/product-list"
              render={() =>
                requireAuth() ? <ProductList /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/error"
              render={() => (requireAuth() ? <Error /> : <Redirect to="/" />)}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userDetails,
  };
};

export default connect(mapStateToProps)(App);
