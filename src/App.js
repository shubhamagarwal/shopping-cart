import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import ProductList from './components/ProductList';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
             <Route exact path="/" component={Login} />
             <Route exact path="/product-list" component={ProductList} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
