import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/login';

import './App.css';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
             <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
