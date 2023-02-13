import React, { useContext } from "react";
import { GameContext } from "../GameProvider";

export const EndModal = ({ onRestart }: { onRestart: () => void }) => {
  const { player1TotalPoints, player2TotalPoints } = useContext(GameContext);

  const [p1TotalPoints] = player1TotalPoints;
  const [p2TotalPoints] = player2TotalPoints;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-52 bg-stone-500 border-2 border-black ring-black ring-4 ring-offset-4 ring-offset-stone-400 backdrop-blur-md">
      <div className="relative flex flex-col justify-evenly items-center min-h-full w-full">
        <div className="w-full flex justify-between px-8 text-lg">
          <p>
            Player 1 Score: <span className="text-xl">{p1TotalPoints}</span>
          </p>
          <p>
            Player 2 Score: <span className="text-xl">{p2TotalPoints}</span>
          </p>
        </div>
        {p1TotalPoints === p2TotalPoints && <p className="text-4xl">Draw</p>}
        {p1TotalPoints > p2TotalPoints && (
          <p className="text-2xl">Player 1 Wins!</p>
        )}
        {p1TotalPoints < p2TotalPoints && (
          <p className="text-2xl">Player 2 Wins!</p>
        )}
        <button onClick={onRestart} className="bg-stone-400 p-2 rounded-md">
          Play again
        </button>
      </div>
    </div>
  );
};
