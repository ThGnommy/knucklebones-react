import { useCallback, useContext, useEffect } from "react";
import { PlayerOneBoard } from "./components/PlayerOneBoard";
import { Player1Profile } from "./components/Player1Profile";
import { Player2Profile } from "./components/Player2Profile";
import { PlayerTwoBoard } from "./components/PlayerTwoBoard";
import "./styles.css";
import { GameContext } from "./GameProvider";

export default function App() {
  const { boardState, player1, player2 } = useContext(GameContext);

  const [player1Board] = player1;
  const [player2Board] = player2;
  const [, setBoardIsFull] = boardState;

  // check if the board is full for each player
  const checkForFullBoard = useCallback(() => {
    if (
      (player1Board[0].length === 3 &&
        player1Board[1].length === 3 &&
        player1Board[2].length === 3) ||
      (player2Board[0].length === 3 &&
        player2Board[1].length === 3 &&
        player2Board[2].length === 3)
    ) {
      setBoardIsFull(true);
    }
  }, [player2Board, player1Board, setBoardIsFull]);

  useEffect(() => {
    checkForFullBoard();
  }, [checkForFullBoard]);

  return (
    <div className="App">
      <h1 style={{ margin: "1rem 0" }}>Knucklebones</h1>
      <div className="game-section">
        <Player1Profile name="Player 1" />
        <section>
          <PlayerTwoBoard />
          <hr style={{ borderColor: "black", margin: "1rem 0" }} />
          <PlayerOneBoard />
        </section>
        <Player2Profile name="Player 2" />
      </div>
    </div>
  );
}
