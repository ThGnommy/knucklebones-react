import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { PlayerTwoSingleRow } from "./PlayerTwoSingleRow";

export const PlayerTwoBoard = () => {
  const {
    player1,
    player2,
    diceCurrentNumber,
    playerTurn,
    player1Points,
    player2Points,
    boardState,
  } = useContext(GameContext);

  const [player1Board, setPlayer1Board] = player1;
  const [player2Board, setPlayer2Board] = player2;
  const [dice, setDice] = diceCurrentNumber;
  const [turn, setTurn] = playerTurn;
  const [p1Points, setP1Points] = player1Points;
  const [p2Points, setP2Points] = player2Points;
  const [boardIsFull] = boardState;

  const calculateP1Score = (row: number) => {
    let rowPoints: number = 0;

    const points = player1Board[row].reduce(
      (accumulator: { [x: string]: any }, value: string | number) => {
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
      (accumulator: { [x: string]: any }, value: string | number) => {
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
    const copiedArr = [...player1Board[row]];

    copiedArr.forEach(() => {
      const opponentNumber = player1Board[row].indexOf(dice);

      if (opponentNumber !== -1) {
        player1Board[row].splice(opponentNumber, 1);
      }
    });

    setPlayer1Board(player1Board);
  };

  const setNumberInRow = ({
    row,
    turnToSet,
  }: {
    row: number;
    turnToSet: 1 | 2;
  }) => {
    if (
      player2Board[row].length === 3 ||
      dice === null ||
      turn !== 2 ||
      boardIsFull === true
    )
      return;

    player2Board[row].push(dice);

    let updatedArr: any = [player2Board[0], player2Board[1], player2Board[2]];

    setPlayer2Board(updatedArr);
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
        onClick={() => setNumberInRow({ row: 0, turnToSet: 1 })}
        className={`line ${turn === 2 && dice !== null ? "selectable" : ""}`}
      >
        <PlayerTwoSingleRow n={0} state={player2Board} />

        <p className="text-xl text-stone-800">{p2Points[0]}</p>
      </section>
      <section
        onClick={() => setNumberInRow({ row: 1, turnToSet: 1 })}
        className={`line ${turn === 2 && dice !== null ? "selectable" : ""}`}
      >
        <PlayerTwoSingleRow n={1} state={player2Board} />

        <p className="text-xl text-stone-800">{p2Points[1]}</p>
      </section>
      <section
        onClick={() => setNumberInRow({ row: 2, turnToSet: 1 })}
        className={`line ${turn === 2 && dice !== null ? "selectable" : ""}`}
      >
        <PlayerTwoSingleRow n={2} state={player2Board} />

        <p className="text-xl text-stone-800">{p2Points[2]}</p>
      </section>
    </div>
  );
};
