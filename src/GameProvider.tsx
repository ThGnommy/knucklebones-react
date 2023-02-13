import { createContext, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export const GameContext = createContext<any>(null);

export const GameProvider = ({ children }: Props) => {
  const [turn, setTurn] = useState<1 | 2>(1);
  const [dice, setDice] = useState<number | null>(null);

  const [player1Board, setPlayer1Board] = useState<[][]>([[], [], []]);
  const [player2Board, setPlayer2Board] = useState<[][]>([[], [], []]);

  const [p1Points, setP1Points] = useState<number[][]>([[0], [0], [0]]);
  const [p2Points, setP2Points] = useState<number[][]>([[0], [0], [0]]);

  const [p1TotalPoints, setP1TotalPoints] = useState(0);
  const [p2TotalPoints, setP2TotalPoints] = useState(0);

  const [boardIsFull, setBoardIsFull] = useState(false);

  const rollDice = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    return random;
  };

  return (
    <GameContext.Provider
      value={{
        playerTurn: [turn, setTurn],
        player1: [player1Board, setPlayer1Board],
        player2: [player2Board, setPlayer2Board],
        player1Points: [p1Points, setP1Points],
        player2Points: [p2Points, setP2Points],
        boardState: [boardIsFull, setBoardIsFull],
        rollDice,
        diceCurrentNumber: [dice, setDice],
        player1TotalPoints: [p1TotalPoints, setP1TotalPoints],
        player2TotalPoints: [p2TotalPoints, setP2TotalPoints],
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
