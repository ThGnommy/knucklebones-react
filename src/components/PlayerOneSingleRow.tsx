import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../GameProvider";

interface SingleRowProps {
  n: number;
  state: any[];
}

export const PlayerOneSingleRow = ({ n, state }: SingleRowProps) => {
  const cell0Ref = useRef<any>();
  const cell1Ref = useRef<any>();
  const cell2Ref = useRef<any>();

  const [exist, setExist] = useState(false);

  const [exist2, setExist2] = useState(false);
  const [exist3, setExist3] = useState(false);

  const { player1, player2 } = useContext(GameContext);

  const [player1Board] = player1;
  const [player2Board] = player2;

  const checkNumbers = useCallback(
    (cellRef: any, numCell: number, setState: any) => {
      const value = Number(cellRef?.current?.textContent);

      let copy = [...state[n]];

      copy.splice(numCell, 1);

      const x = copy.includes(value);

      if (x === true) setState(true);
      else if (x === false) {
        setState(false);
      }
    },
    [state, n]
  );

  useEffect(() => {
    checkNumbers(cell0Ref, 0, setExist);
    checkNumbers(cell1Ref, 1, setExist2);
    checkNumbers(cell2Ref, 2, setExist3);
  }, [checkNumbers, player1Board, player2Board]);

  return (
    <>
      <div ref={cell0Ref}>
        <span
          className={`
          ${exist ? "bg-amber-600 scale-110 -rotate-3" : "bg-stone-600"}
          ${
            state[n][0] ? "scale-100" : "scale-0"
          } dice transition-all duration-500`}
        >
          {state[n][0]}
        </span>
      </div>
      <div ref={cell1Ref}>
        <span
          className={`
          ${exist2 ? "bg-amber-600 scale-110 -rotate-3" : "bg-stone-600"}
          ${
            state[n][1] ? "scale-100" : "scale-0"
          } dice transition-all duration-500`}
        >
          {state[n][1]}
        </span>
      </div>
      <div ref={cell2Ref}>
        <span
          className={`${state[n][2] ? "scale-100" : "scale-0"}
          ${exist3 ? "bg-amber-600 scale-110 -rotate-3" : "bg-stone-600"} dice
          transition-all duration-500`}
        >
          {state[n][2]}
        </span>
      </div>
    </>
  );
};
