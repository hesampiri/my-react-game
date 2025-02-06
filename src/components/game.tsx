import { useEffect, useState } from "react";

import MoveList from "./moveList";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "./board";
const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = [Array(9).fill("")];
  const [history, setHistory] = useState<string[][]>(initialState);
  const [isXnext, setIsXnext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoxes = history[currentMove];

  function encodeGameState() {
    const params = new URLSearchParams();
    params.set("history", JSON.stringify(history));
    params.set("currentmove", currentMove.toString());
    params.set("isXnext", JSON.stringify(isXnext));
    return params.toString();
  }

  function decodeGameState(params: URLSearchParams) {
    const history = JSON.parse(params.get("history") || "[]");
    const currentMove = parseInt(params.get("currentmove") || "0", 10);
    const isXnext = JSON.parse(params.get("isXnext") || "true");
    return { history, currentMove, isXnext };
  }

  function updateUrl() {
    const query = encodeGameState();
    navigate("?" + query, { replace: true });
  }

  function saveToLocalStorage() {
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("isXnext", JSON.stringify(isXnext));
    localStorage.setItem("currentMove", currentMove.toString());
  }

  function restoreFromLocalStorage() {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const isXnext = JSON.parse(localStorage.getItem("isXnext") || "true");
    const currentMove = parseInt(
      localStorage.getItem("currentMove") || "0",
      10
    );
    return { history, isXnext, currentMove };
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let gamestate;
    if (
      params.has("history") &&
      params.has("currentmove") &&
      params.has("isXnext")
    ) {
      gamestate = decodeGameState(params);
      console.log("restored from url");
    } else {
      gamestate = restoreFromLocalStorage();
      console.log("restored from storage");
    }
    setHistory(gamestate.history);
    setIsXnext(gamestate.isXnext);
    setCurrentMove(gamestate.currentMove);
  }, []);

  useEffect(() => {
    saveToLocalStorage();
    updateUrl();
  }, [history, isXnext, currentMove]);

  function gamehandler(nextBox: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextBox];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsXnext(!isXnext);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
    setIsXnext(move % 2 === 0);
    saveToLocalStorage();
  }

  function resetHistory() {
    setHistory(initialState);
    setCurrentMove(0);
    setIsXnext(true);
  }

  function undoHandler() {
    if (currentMove > 0) {
      jumpTo(currentMove - 1);
    }
  }
  function redoHandler() {
    if (currentMove < history.length - 1) {
      jumpTo(currentMove + 1);
    }
  }

  return (
    <div className="mx-auto flex items-center flex-wrap container justify-around h-full">
      <div className=" flex justify-center w-[300px] mt-10 lg:mt-0">
        <button
          onClick={redoHandler}
          className="border-3 p-1 w-[100px] bg-[#C9F9FC] font-bold rounded-lg cursor-pointer"
        >
          REDO
        </button>
        <button
          onClick={resetHistory}
          className="border-3 p-1 w-[100px] bg-[#FBB500] font-bold rounded-lg cursor-pointer mx-3"
        >
          RESET
        </button>
        <button
          onClick={undoHandler}
          className="border-3 p-1 w-[100px] bg-[#C9F9FC] font-bold rounded-lg cursor-pointer"
        >
          UNDO
        </button>
      </div>
      <div className="flex flex-col items-center h-full pt-10">
        <div className="mx-4">
          <img src="/public/Players.svg" alt="" />
        </div>
        <Board
          isXnext={isXnext}
          boxes={currentBoxes}
          gamehandler={gamehandler}
        />
      </div>
      <div className="h-[500px] w-[300px] flex justify-center">
        <MoveList history={history} jumpTo={jumpTo} />
      </div>
    </div>
  );
};

export default Game;
