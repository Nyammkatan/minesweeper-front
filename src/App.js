import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import TokenHolder from './storage/tokenStorage';
import GameHolder from './components/GameHolder';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Minesweeper Game
      </header>
      <div className='game-root'>
        <p>
          Minesweeper is a game where mines are hidden in a grid of squares. Safe squares have numbers telling you how many mines touch the square. You can use the number clues to solve the game by opening all of the safe squares. If you click on a mine you lose the game!
        </p>
        <p>
          Left click - check tile<br/>
          Right click - mark as bomb
        </p>
        <TokenHolder>
            <GameHolder/>
        </TokenHolder>
      </div>
    </div>
  );
}

export default App;
