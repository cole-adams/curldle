import './App.css';

import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <div className="toast-wrapper">
          <Toaster
              position="bottom-center"
          />
      </div>
      <Header />
      <Game />
      <Footer />
    </div>
  )
}

export default App;
