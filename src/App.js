import { useEffect, useState } from "react";
import LineTo from "react-lineto";
import { FiX } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import DropZone from "./DropZone";
import Cross from "./Cross";
import Circle from "./Circle";

function App() {
    const [xMove, setXMove] = useState(true);
    const [x, setX] = useState([]);
    const [o, setO] = useState([]);
    const [usedX, setUsedX] = useState([]);
    const [usedO, setUsedO] = useState([]);
    const [winningLine, setWinningLine] = useState();

    const [available, setAvailable] = useState([]);
    const [overridable, setOverridable] = useState([]);

    const [gameCell, setGameCell] = useState({});

    const showCellsOnDragStart = (type, size, index) => {
        let initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        // if (Object.entries(gameCell).length > 0) console.log(Object.entries(gameCell)[0][1].type);
        // if (Object.entries(gameCell).length > 0) console.log(Object.entries(gameCell).filter((cell) => cell[1].type === "o"));

        // if (Object.entries(gameCell).length > 0) console.log(Object.entries(gameCell).filter((temp) => temp[1].type === "o" && temp[1].size < size));
        // console.log(
        //     Object.entries(gameCell)
        //         .filter((temp) => temp[1].type === "o" && temp[1].size >= size)
        //         .reduce((array, element) => {
        //             array.push(element[0]);
        //             return array;
        //         }, [])
        // );
        if (type === "x")
            console.log(
                initialCells.filter(
                    (cell) =>
                        !x.includes(cell) &&
                        !Object.entries(gameCell)
                            .filter((temp) => temp[1].type === "o" && temp[1].size >= size)
                            .reduce((array, element) => {
                                array.push(Number(element[0]));
                                return array;
                            }, [])
                            .includes(cell)
                )
            );
    };

    const winningCombinations = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
    ];

    useEffect(() => {
        winningCombinations.forEach((winningCombination) => {
            if (winningCombination.every((v) => x.includes(v))) {
                setWinningLine(winningCombination);
                window.alert("X won");
            }
        });
    }, [x]);

    useEffect(() => {
        winningCombinations.forEach((winningCombination) => {
            if (winningCombination.every((v) => o.includes(v))) {
                setWinningLine(winningCombination);
                window.alert("O won");
            }
        });
    }, [o]);

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
                    <div className="grid grid-cols-7 justify-center items-center w-full text-center mr-14">
                        <FaLongArrowAltRight className={`mx-auto text-red-600 text-[2rem] font-bold ${xMove ? "" : "invisible"}`} />

                        {[...Array(6).keys()].map((figure) => (
                            <div className="flex justify-center w-full h-[64px] items-center">
                                <Cross size={figure} x={x} index={figure} usedX={usedX} xMove={xMove} showCellsOnDragStart={showCellsOnDragStart} />
                            </div>
                        ))}
                    </div>

                    <div className=" w-[400px] h-[400px]  grid grid-cols-3 grid-rows-3 justify-items-center items-center">
                        {[...Array(9).keys()].map((cell) => (
                            <div
                                className={`w-[90%] h-[90%] bg-blue-500  ${
                                    winningLine ? null : "cursor-pointer hover:bg-blue-300"
                                } flex justify-center items-center ${cell}`}
                                key={cell}
                                // onClick={() => (winningLine ? null : handleCellClicked(cell + 1))}
                            >
                                <DropZone
                                    index={cell}
                                    x={x}
                                    setX={setX}
                                    o={o}
                                    setO={setO}
                                    usedX={usedX}
                                    usedO={usedO}
                                    setUsedX={setUsedX}
                                    setUsedO={setUsedO}
                                    xMove={xMove}
                                    setXMove={setXMove}
                                    gameCell={gameCell}
                                    setGameCell={setGameCell}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 justify-around items-center w-full mr-14 h-[64px]">
                        <FaLongArrowAltRight className={`mx-auto text-red-600 text-[2rem] font-bold  ${xMove ? "invisible" : ""}`} />

                        {[...Array(6).keys()].map((figure) => (
                            <div className="flex justify-center w-full h-[64px] items-center">
                                <Circle size={figure} o={o} index={figure} usedO={usedO} xMove={xMove} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* <p>{xMove ? "X move" : "O move"}</p> */}
            </div>
            {winningLine ? <LineTo from={String(winningLine[0])} to={String(winningLine[2])} borderWidth={4} borderStyle="" delay={1000} /> : null}
        </div>
    );
}

export default App;
