import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import GuestHome from './components/GuestHome/GuestHome';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="overlay">
          <Switch>
            <Route exact path="/" component={GuestHome} />
            <Route exact path="/:username" component={Home} />
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
