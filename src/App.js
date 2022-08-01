import { useEffect, useState } from "react";
import LineTo from "react-lineto";
import { FiX } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

function App() {
  const [xMove, setXMove] = useState(true);
  const [x, setX] = useState([]);
  const [o, setO] = useState([]);
  const [winningLine, setWinningLine] = useState();

  const winningCombinations = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    winningCombinations.forEach((winningCombination) => {
      if (winningCombination.every((v) => x.includes(v))) {
        setWinningLine(winningCombination);
        console.log("X won");
        console.log(winningCombination);
      }
    });
  });

  useEffect(() => {
    winningCombinations.forEach((winningCombination) => {
      if (winningCombination.every((v) => o.includes(v))) {
        setWinningLine(winningCombination);
        console.log("O won");
        console.log(winningCombination);
      }
    });
  });

  const handleCellClicked = (index) => {
    if (!(x.includes(index) || o.includes(index))) {
      if (xMove) {
        let temp = [...x, index];
        setX(() => temp);
        setXMove(false);
      } else {
        let temp = [...o, index];
        setO(temp);
        setXMove(true);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-green-800 flex justify-center items-center">
      <h2 className=" absolute top-0 left-2/4 -translate-x-2/4 p-4 text-[1.5rem] text-neutral-300 font-medium font-mono">
        Welcome to the Next Level TicTacToe
      </h2>
      <div className=" w-[60%] p-10 bg-white rounded-2xl relative flex flex-col justify-center gap-14 items-center ">
        <div className="w-full max-w-md h-full flex flex-col justify-center gap-14 items-center ">
          <div className="grid grid-cols-7 justify-center items-center w-full text-center">
            <FaLongArrowAltRight
              className={`mx-auto text-red-600 text-[2rem] font-bold ${
                xMove ? "" : "invisible"
              }`}
            />

            {[...Array(6).keys()].map((figure) => (
              <DragDropContainer targetKey="foo" key={figure}>
                <FiX
                  onDragStart={console.log()}
                  key={"X" + figure}
                  //   className={`text-[${(figure + 1) * 10}px]`}
                  style={{ fontSize: `${(figure + 3) * 8}px` }}
                />
              </DragDropContainer>
            ))}
          </div>

          <div className=" w-[400px] h-[400px]  grid grid-cols-3 grid-rows-3 justify-items-center items-center">
            {[...Array(9).keys()].map((cell) => (
              <div
                className={`w-[90%] h-[90%] bg-blue-500  ${
                  winningLine ? null : "cursor-pointer hover:bg-blue-300"
                } flex justify-center items-center ${cell}`}
                key={cell}
                onClick={() =>
                  winningLine ? null : handleCellClicked(cell + 1)
                }
              >
                <DropTarget targetKey="foo">
                  {x.includes(cell + 1) ? (
                    <FiX className=" text-[3rem]" />
                  ) : o.includes(cell + 1) ? (
                    <div className="w-[32px] h-[32px] rounded-[50%] border-4 border-black"></div>
                  ) : null}
                </DropTarget>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 justify-around items-center w-full">
            <FaLongArrowAltRight
              className={`mx-auto text-red-600 text-[2rem] font-bold  ${
                xMove ? "invisible" : ""
              }`}
            />

            {[...Array(6).keys()].map((figure) => (
              // <FiX
              //   key={"X" + figure}
              //   //   className={`text-[${(figure + 1) * 10}px]`}
              //   style={{ fontSize: `${(figure + 3) * 8}px` }}
              // />
              <div
                key={"O" + figure}
                style={{
                  width: `${(figure + 3) * 6}px`,
                  height: `${(figure + 3) * 6}px`,
                }}
                className="rounded-[50%] border-4 border-black"
              ></div>
            ))}
          </div>
        </div>

        {/* <p>{xMove ? "X move" : "O move"}</p> */}
      </div>
      {winningLine ? (
        <LineTo
          from={String(winningLine[0] - 1)}
          to={String(winningLine[2] - 1)}
          borderWidth={4}
          borderStyle=""
          delay={1000}
        />
      ) : null}
    </div>
  );
}

export default App;
