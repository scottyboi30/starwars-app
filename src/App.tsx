import React from 'react';
import './app.scss';

import Home from './pages/Home';

const App: React.FC = () => (
    <div className="app">
      <header className="app__header">
        STAR WARS HEROES
      </header>
      <main className="app__main">
        <Home/>
      </main>
    </div>
  );

export default App;
