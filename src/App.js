import './App.css';

import React from 'react';
import Game from './components/Game';
import Header from './components/Header';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <div className="toast-wrapper">
          <Toaster
              position="top-center"
          />
      </div>
      <Header />
      <Game />
    </div>
  )
}

export default App;
