import { useCallback, useContext, useEffect } from "react";
import { PlayerOneBoard } from "./components/PlayerOneBoard";
import { Player1Profile } from "./components/Player1Profile";
import { Player2Profile } from "./components/Player2Profile";
import { PlayerTwoBoard } from "./components/PlayerTwoBoard";
import { GameContext } from "./GameProvider";
import { HowToPlay } from "./components/HowToPlay";

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
    <div className="app">
      <h1 className="tracking-widest my-8 underline text-stone-900 font-black text-3xl -rotate-6">
        Knucklebones
      </h1>
      <div className="flex w-full max-w-[500px] items-center justify-between sm:flex-row flex-col-reverse">
        <Player1Profile name="Player 1" />
        <section className="flex flex-col gap-12">
          <PlayerTwoBoard />
          <PlayerOneBoard />
        </section>
        <Player2Profile name="Player 2" />
      </div>
      <HowToPlay />
    </div>
  );
}
