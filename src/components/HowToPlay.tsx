export const HowToPlay = () => {
  return (
    <div className="mx-4 lg:w-1/2 mt-12 bg-stone-500 border-2 border-black ring-black ring-4 ring-offset-4 ring-offset-stone-400">
      <h2 className="tracking-wide py-4 text-2xl">How To Play</h2>
      <div className="flex gap-8 p-4 flex-col ">
        <div>
          <h3 className="tracking-wide font-semibold underline">MATCH DICE</h3>
          <p className="tracking-wide">
            When dice of the same number are placed in the same column, multiply
            their value.
          </p>
        </div>
        <div>
          <h3 className="tracking-wide font-semibold underline">
            DESTROY OPPONENT
          </h3>
          <p className="">
            Destroy your opponents dice by matching yours to theirs.
          </p>
        </div>
      </div>
    </div>
  );
};
