import { useCallback, useContext, useEffect } from "react";
import { GameContext } from "../GameProvider";
import "../styles.css";

interface PlayerProfileProps {
  name: string;
}

export const Player2Profile = ({ name }: PlayerProfileProps) => {
  const {
    diceCurrentNumber,
    rollDice,
    playerTurn,
    player2Points,
    player2TotalPoints
  } = useContext(GameContext);

  const [dice, setDice] = diceCurrentNumber;
  const [turn] = playerTurn;
  const [p2Points] = player2Points;
  const [p2TotalPoints, setP2TotalPoints] = player2TotalPoints;

  // avoid re-roll the dice in the same turn
  const handleDice = () => {
    if (typeof dice === "number") return;
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
    <div className="player-profile">
      <h2 style={{ padding: "1rem 0" }}>{name}</h2>
      <h2 style={{ padding: "0 0 1rem" }}>{p2TotalPoints}</h2>
      {/* Dice place here */}
      <div onClick={handleDice} className="dice-box">
        {turn === 2 ? (dice ? dice : "roll!") : "wait..."}
      </div>
    </div>
  );
};
