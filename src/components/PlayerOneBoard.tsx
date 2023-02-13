import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { PlayerOneSingleRow } from "./PlayerOneSingleRow";
import "../index.css";

export const PlayerOneBoard = () => {
  const {
    player1,
    player2,
    playerTurn,
    diceCurrentNumber,
    player1Points,
    player2Points,
    boardState,
  } = useContext(GameContext);

  const [player1Board, setPlayer1Board] = player1;
  const [player2Board, setPlayer2Board] = player2;
  const [turn, setTurn] = playerTurn;
  const [dice, setDice] = diceCurrentNumber;
  const [p1Points, setP1Points] = player1Points;
  const [p2Points, setP2Points] = player2Points;
  const [boardIsFull] = boardState;

  const calculateP1Score = (row: number) => {
    let rowPoints: number = 0;

    const points = player1Board[row].reduce(
      (accumulator: { [x: string]: number }, value: string | number) => {
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
      },
      {}
    );

    for (const [key, value] of Object.entries(points)) {
      const k = Number(key);
      const v = Number(value);
      let result = 0;

      if (v === 1) result = k;
      else if (v === 2) result = (k + k) * v;
      else if (v === 3) result = (k + k + k) * v;
      else return;
      rowPoints += result;
    }

    p1Points[row] = rowPoints;
    setP1Points([p1Points[0], p1Points[1], p1Points[2]]);
  };

  const calculateP2Score = (row: number) => {
    let rowPoints: number = 0;

    const points = player2Board[row].reduce(
      (accumulator: { [x: string]: number }, value: string | number) => {
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
      },
      {}
    );

    for (const [key, value] of Object.entries(points)) {
      const k = Number(key);
      const v = Number(value);

      let result = 0;

      if (v === 1) result = k;
      else if (v === 2) result = (k + k) * v;
      else if (v === 3) result = (k + k + k) * v;
      else return;
      rowPoints += result;
    }

    p2Points[row] = rowPoints;
    setP2Points([p2Points[0], p2Points[1], p2Points[2]]);
  };

  const checkOpponentBoard = (row: number) => {
    const copiedArr = [...player2Board[row]];

    copiedArr.forEach(() => {
      const opponentNumber = player2Board[row].indexOf(dice);

      if (opponentNumber !== -1) {
        player2Board[row].splice(opponentNumber, 1);
      }
    });

    setPlayer2Board(player2Board);
  };

  const setNumberInRow = ({
    row,
    turnToSet,
  }: {
    row: number;
    turnToSet: 1 | 2;
  }) => {
    if (
      player1Board[row].length === 3 ||
      dice === null ||
      turn !== 1 ||
      boardIsFull === true
    )
      return;

    player1Board[row].push(dice);

    let updatedArr = [player1Board[0], player1Board[1], player1Board[2]];

    setPlayer1Board(updatedArr);
    setTurn(turnToSet);

    // check component board
    checkOpponentBoard(row);

    // reset the dice
    setDice(null);

    // calculate the score at the end of the turn
    calculateP1Score(row);
    calculateP2Score(row);
  };

  return (
    <div className="flex">
      <section
        onClick={() => setNumberInRow({ row: 0, turnToSet: 2 })}
        className={`line ${turn === 1 && dice !== null ? "selectable" : ""}`}
      >
        <p className="text-xl text-stone-800">{p1Points[0]}</p>
        <PlayerOneSingleRow n={0} state={player1Board} />
      </section>
      <section
        onClick={() => setNumberInRow({ row: 1, turnToSet: 2 })}
        className={`line ${turn === 1 && dice !== null ? "selectable" : ""}`}
      >
        <p className="text-xl text-stone-800">{p1Points[1]}</p>
        <PlayerOneSingleRow n={1} state={player1Board} />
      </section>
      <section
        onClick={() => setNumberInRow({ row: 2, turnToSet: 2 })}
        className={`line ${turn === 1 && dice !== null ? "selectable" : ""}`}
      >
        <p className="text-xl text-stone-800">{p1Points[2]}</p>
        <PlayerOneSingleRow n={2} state={player1Board} />
      </section>
    </div>
  );
};
