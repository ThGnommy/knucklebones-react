import { useCallback, useContext, useEffect } from "react";
import { PlayerOneBoard } from "./components/PlayerOneBoard";
import { Player1Profile } from "./components/Player1Profile";
import { Player2Profile } from "./components/Player2Profile";
import { PlayerTwoBoard } from "./components/PlayerTwoBoard";
import { GameContext } from "./GameProvider";
import { HowToPlay } from "./components/HowToPlay";
import { EndModal } from "./components/EndModal";

export default function App() {
  const {
    playerTurn,
    player1,
    player2,
    player1Points,
    player2Points,
    boardState,
    player1TotalPoints,
    player2TotalPoints,
  } = useContext(GameContext);

  const [, setTurn] = playerTurn;
  const [player1Board, setPlayer1Board] = player1;
  const [player2Board, setPlayer2Board] = player2;
  const [boardIsFull, setBoardIsFull] = boardState;
  const [, setP1Points] = player1Points;
  const [, setP2Points] = player2Points;

  const [, setP1TotalPoints] = player1TotalPoints;
  const [, setP2TotalPoints] = player2TotalPoints;

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

  const restartGame = () => {
    setTurn(1);
    setBoardIsFull(false);
    setPlayer1Board([[], [], []]);
    setPlayer2Board([[], [], []]);
    setP1TotalPoints(Number(0));
    setP2TotalPoints(Number(0));
    setP1Points([[0], [0], [0]]);
    setP2Points([[0], [0], [0]]);
  };

  return (
    <div className="app">
      <h1 className="tracking-widest my-8 underline text-stone-900 font-black text-3xl -rotate-6">
        Knucklebones
      </h1>
      <div className="relative flex w-full max-w-[500px] items-center justify-between sm:flex-row flex-col-reverse">
        <Player1Profile name="Player 1" />
        <section className="flex flex-col gap-12">
          <PlayerTwoBoard />
          <PlayerOneBoard />
        </section>
        <Player2Profile name="Player 2" />
        {boardIsFull && <EndModal onRestart={restartGame} />}
      </div>
      <HowToPlay />
    </div>
  );
}
