import Box from "./box";

const Board = ({
  isXnext,
  boxes,
  gamehandler,
}: {
  isXnext: boolean;
  boxes: string[];
  gamehandler: (nextBox: string[]) => void;
}) => {
  function winnercalculator(boxes: string[]) {
    const odds = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < odds.length; i++) {
      const [a, b, c] = odds[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }
  }

  function clickhandler(number: number) {
    if (boxes[number] !== "" || winnercalculator(boxes)) {
      return;
    }
    const nextBox = boxes.slice();
    if (isXnext) {
      nextBox[number] = "x";
    } else {
      nextBox[number] = "o";
    }

    gamehandler(nextBox);
  }

  const winner = winnercalculator(boxes);
  let status: string;
  if (winner) {
    status = "Winner is " + winner;
  } else if (!boxes.includes("") && !winner) {
    status = "Draw";
  } else {
    status = "Next player is " + (isXnext ? "X" : "O");
  }

  return (
    <>
      <div className="size-[300px] sm:size-[400px] z-0">
        <div className=" text-center py-5 text-2xl font-bold capitalize">
          <h1>{status}</h1>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 rounded-4xl gap-1 border-10 bg-white h-full p-[30px]">
          <Box icon={boxes[0]} onboxClick={() => clickhandler(0)} />
          <Box icon={boxes[1]} onboxClick={() => clickhandler(1)} />
          <Box icon={boxes[2]} onboxClick={() => clickhandler(2)} />
          <Box icon={boxes[3]} onboxClick={() => clickhandler(3)} />
          <Box icon={boxes[4]} onboxClick={() => clickhandler(4)} />
          <Box icon={boxes[5]} onboxClick={() => clickhandler(5)} />
          <Box icon={boxes[6]} onboxClick={() => clickhandler(6)} />
          <Box icon={boxes[7]} onboxClick={() => clickhandler(7)} />
          <Box icon={boxes[8]} onboxClick={() => clickhandler(8)} />
        </div>
      </div>
    </>
  );
};

export default Board;
