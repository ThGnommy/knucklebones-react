import { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../GameProvider";

interface PlayerProfileProps {
  name: string;
}

export const Player2Profile = ({ name }: PlayerProfileProps) => {
  const {
    diceCurrentNumber,
    rollDice,
    playerTurn,
    player2Points,
    player2TotalPoints,
    boardState,
  } = useContext(GameContext);

  const [dice, setDice] = diceCurrentNumber;
  const [turn] = playerTurn;
  const [p2Points] = player2Points;
  const [p2TotalPoints, setP2TotalPoints] = player2TotalPoints;
  const [boardIsFull] = boardState;

  const diceStyles =
    turn === 2 ? (dice ? "dice-in-box" : "dice-in-box animate-bounce") : "";

  const arrow =
    turn === 2
      ? dice
        ? ""
        : "after:text-3xl after:content-['➛'] after:absolute after:left-6 after:bottom-1 after:text-red-900 after:font-semibold after:animate-bounce"
      : "";

  // avoid re-roll the dice in the same turn
  const handleDice = () => {
    if (typeof dice === "number" || turn !== 2) return;
    setDice(rollDice());
  };

  const calculatePoints = useCallback(() => {
    const result =
      Number(p2Points[0]) + Number(p2Points[1]) + Number(p2Points[2]);
    setP2TotalPoints(result);
  }, [p2Points, setP2TotalPoints]);

  useEffect(() => {
    calculatePoints();
  }, [calculatePoints]);

  return (
    <div
      className={`sm:place-self-start place-self-auto mb-8 ${
        boardIsFull ? "invisible" : "visible"
      }`}
    >
      <h2 className="italic font-bold text-3xl text-stone-900 py-4">{name}</h2>
      <h2 className="mb-4 text-2xl font-semibold">{p2TotalPoints}</h2>
      {/* Dice place here */}
      <div onClick={handleDice} className={`dice-box ${arrow}`}>
        <span className={diceStyles}>{turn === 2 && dice}</span>
      </div>
    </div>
  );
};
