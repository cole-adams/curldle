import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="fixed w-full h-full top-0 left-0 z-20 pointer-events-none">
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
