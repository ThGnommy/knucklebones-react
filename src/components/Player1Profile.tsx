import { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../GameProvider";
import "../styles.css";

interface PlayerProfileProps {
  name: string;
}

export const Player1Profile = ({ name }: PlayerProfileProps) => {
  const {
    diceCurrentNumber,
    rollDice,
    playerTurn,
    player1Points,
    player1TotalPoints
  } = useContext(GameContext);

  const [dice, setDice] = diceCurrentNumber;
  const [turn] = playerTurn;
  const [p1Points] = player1Points;
  const [p1TotalPoints, setP1TotalPoints] = player1TotalPoints;

  // avoid re-roll the dice in the same turn
  const handleDice = () => {
    if (typeof dice === "number") return;
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
    <div className="player-profile">
      <h2 style={{ padding: "1rem 0" }}>{name}</h2>
      <h2 style={{ padding: "0 0 1rem" }}>{p1TotalPoints}</h2>
      {/* Dice place here */}
      <div onClick={handleDice} className="dice-box">
        {turn === 1 ? (dice ? dice : "roll!") : "wait..."}
      </div>
    </div>
  );
};
