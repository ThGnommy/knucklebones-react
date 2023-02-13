import { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../GameProvider";
interface PlayerProfileProps {
  name: string;
}

export const Player1Profile = ({ name }: PlayerProfileProps) => {
  const {
    diceCurrentNumber,
    rollDice,
    playerTurn,
    player1Points,
    player1TotalPoints,
    boardState,
  } = useContext(GameContext);

  const [dice, setDice] = diceCurrentNumber;
  const [turn] = playerTurn;
  const [p1Points] = player1Points;
  const [p1TotalPoints, setP1TotalPoints] = player1TotalPoints;
  const [boardIsFull] = boardState;

  const diceStyles =
    turn === 1 ? (dice ? "dice-in-box" : "dice-in-box animate-bounce") : "";

  const arrow =
    turn === 1
      ? dice
        ? ""
        : "after:text-3xl after:content-['➛'] after:absolute after:left-6 after:bottom-1 after:text-red-900 after:font-semibold after:animate-bounce"
      : "";

  // avoid re-roll the dice in the same turn
  const handleDice = () => {
    if (typeof dice === "number" || turn !== 1) return;
    setDice(rollDice());
  };

  const calculatePoints = useCallback(() => {
    const result =
      Number(p1Points[0]) + Number(p1Points[1]) + Number(p1Points[2]);
    setP1TotalPoints(result);
  }, [p1Points, setP1TotalPoints]);

  useEffect(() => {
    calculatePoints();
  }, [calculatePoints]);

  return (
    <div
      className={`sm:place-self-end place-self-auto ${
        boardIsFull ? "invisible" : "visible"
      }`}
    >
      <h2 className="italic font-bold text-3xl text-stone-900 py-4">{name}</h2>
      <h2 className="mb-4 text-2xl font-semibold">{p1TotalPoints}</h2>
      {/* Dice place here */}
      <div onClick={handleDice} className={`dice-box ${arrow}`}>
        <span className={diceStyles}>{turn === 1 && dice}</span>
      </div>
    </div>
  );
};
