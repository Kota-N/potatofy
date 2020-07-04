import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import GuestHome from './components/GuestHome/GuestHome';
import Home from './components/Home/Home';
import Showcase from './components/Showcase/Showcase';
import Footer from './components/Footer/Footer';

function App() {
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <BrowserRouter>
      <div
        className="scroll-me"
        onScroll={e => {
          setScrollTop(e.target.scrollTop);
        }}
      >
        <div className="app">
          <div id="background-image" className="background-image"></div>
          <div className="overlay">
            <Switch>
              <Route exact path="/" component={GuestHome} />
              <Route exact path="/:username" component={Home} />
            </Switch>
            <Showcase scrollTop={scrollTop} />
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
