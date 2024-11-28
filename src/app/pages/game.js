"use client";

import { useEffect } from "react";
import createGame from "../lib/game";

const Game = () => {
  useEffect(() => {
    const game = createGame();
    return () => game.destroy(true); // Cleanup game instance
  }, []);

  return (
    <div>
      <h1>My Phaser Game</h1>
      <div id="phaser-container"></div>
    </div>
  );
};

export default Game;
