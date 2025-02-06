const MoveList = ({
  history,
  jumpTo,
}: {
  history: string[][];
  jumpTo: (move: number) => void;
}) => {
  const gridPositions = [
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 3, col: 1 },
    { row: 3, col: 2 },
    { row: 3, col: 3 },
  ];
  return (
    <div className="capitalize">
      <p>list of moves</p>
      <ol>
        {history.map((boxes, move) => {
          let title;
          if (move > 0) {
            const moveIndex = boxes.findIndex(
              (val, idx) => val !== history[move - 1][idx]
            );
            const { row, col } = gridPositions[moveIndex];
            const player = move % 2 === 0 ? "O" : "X";
            title = "#" + move + " player "+ player + " Col" + col + " Row" + row;
          } else {
            title = "# the start level #";
          }
          return (
            <li key={move}>
              <button
                onClick={() => jumpTo(move)}
                className="px-2 py-1 border-4 rounded-lg my-0.5 bg-[#FBB500] uppercase font-bold cursor-pointer"
              >
                {title}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default MoveList;
