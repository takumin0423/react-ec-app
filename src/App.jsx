import React from 'react';
import Router from './Router';
import './assets/reset.css';
import './assets/style.css';
import Header from './components/header/Header';

const App = () => {
  return (
      <>
        <Header/>

        <main className="main">
          <Router/>
        </main>
      </>
  );
};

export default App;