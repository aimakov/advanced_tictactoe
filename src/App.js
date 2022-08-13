import { useEffect, useState } from "react";
import LineTo from "react-lineto";
import { FiX } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import DropZone from "./DropZone";
import Cross from "./Cross";
import Circle from "./Circle";
import PickPairs from "./PickPairs";

import { FightPairs } from "./assets/Pairs";

function App() {
    const [xMove, setXMove] = useState(true);
    const [x, setX] = useState([]);
    const [o, setO] = useState([]);
    const [usedX, setUsedX] = useState([]);
    const [usedO, setUsedO] = useState([]);
    const [winningLine, setWinningLine] = useState();

    const [available, setAvailable] = useState([]);
    const [overridable, setOverridable] = useState([]);
    const [notAvailable, setNotAvailable] = useState([]);

    const [gameCell, setGameCell] = useState({});

    const [pair, setPair] = useState();

    const showCellsOnDragStart = (type, size, index) => {
        let initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        if (type === "x") {
            setOverridable(
                initialCells.filter((cell) =>
                    Object.entries(gameCell)
                        .filter((temp) => temp[1].type === "o" && temp[1].size < size)
                        .reduce((array, element) => {
                            array.push(Number(element[0]));
                            return array;
                        }, [])
                        .includes(cell)
                )
            );
            setAvailable(initialCells.filter((cell) => !x.includes(cell) && !o.includes(cell)));
        }

        if (type === "o") {
            setOverridable(
                initialCells.filter((cell) =>
                    Object.entries(gameCell)
                        .filter((temp) => temp[1].type === "x" && temp[1].size < size)
                        .reduce((array, element) => {
                            array.push(Number(element[0]));
                            return array;
                        }, [])
                        .includes(cell)
                )
            );
            setAvailable(initialCells.filter((cell) => !x.includes(cell) && !o.includes(cell)));
        }
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
        let initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        if (available.length === 0 && overridable.length === 0) setNotAvailable([]);
        else setNotAvailable(initialCells.filter((cell) => !available.includes(cell) && !overridable.includes(cell)));
    }, [available, overridable]);

    useEffect(() => {
        winningCombinations.forEach((winningCombination) => {
            if (winningCombination.every((v) => x.includes(v))) {
                setWinningLine(winningCombination);
                window.alert("X won");
            }
        });
    }, [x]);

    useEffect(() => {
        console.log(Object.entries(gameCell).length);
        if (Object.entries(gameCell).length > 8 && !winningLine) window.alert("It's a tie.");
    }, [gameCell]);

    useEffect(() => {
        winningCombinations.forEach((winningCombination) => {
            if (winningCombination.every((v) => o.includes(v))) {
                setWinningLine(winningCombination);
                window.alert("O won");
            }
        });
    }, [o]);

    const handleReset = () => {
        window.location.reload(false);
    };

    if (!pair)
        return (
            <div className="w-screen h-screen bg-green-800 flex flex-col justify-center items-center">
                <div className=" h-3/4 p-6 bg-white rounded-2xl relative flex flex-col justify-center gap-14 items-center ">
                    <PickPairs pairs={FightPairs} setPair={setPair} />
                </div>
            </div>
        );

    return (
        <>
            <div className="w-screen h-screen bg-green-800 flex flex-col justify-center items-center gap-4">
                {/* <h2 className=" absolute top-0 left-2/4 -translate-x-2/4 p-4 text-[1.5rem] text-neutral-300 font-medium font-mono">
                    Welcome to the Next Level TicTacToe
                </h2> */}

                <div className=" w-[85%] p-6 bg-white rounded-2xl relative flex flex-col justify-center items-center ">
                    <div className="w-full h-full flex flex-col justify-center gap-6 items-center ">
                        <div className="grid grid-cols-7 justify-center items-center w-full text-center mr-14 h-[90px]">
                            <FaLongArrowAltRight className={`mx-auto text-red-600 text-[2rem] font-bold ${xMove ? "" : "invisible"}`} />

                            {[...Array(6).keys()].map((figure) => (
                                <div className="flex justify-center w-full h-fit items-center">
                                    <Cross
                                        size={figure}
                                        x={x}
                                        index={figure}
                                        usedX={usedX}
                                        xMove={xMove}
                                        showCellsOnDragStart={showCellsOnDragStart}
                                        setAvailable={setAvailable}
                                        setOverridable={setOverridable}
                                        winningLine={winningLine}
                                        pair={FightPairs[pair - 1]}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="  gap-2 grid grid-cols-3 grid-rows-3 justify-items-center items-center">
                            {[...Array(9).keys()].map((cell) => (
                                <div
                                    className={`w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] bg-blue-500 flex justify-center items-center ${cell}`}
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
                                        available={available}
                                        overridable={overridable}
                                        pair={FightPairs[pair - 1]}
                                        notAvailable={notAvailable}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 justify-around items-center w-full mr-14 h-[90px]">
                            <FaLongArrowAltRight className={`mx-auto text-red-600 text-[2rem] font-bold  ${xMove ? "invisible" : ""}`} />

                            {[...Array(6).keys()].map((figure) => (
                                <div className="flex justify-center w-full h-fit  items-center">
                                    <Circle
                                        size={figure}
                                        o={o}
                                        index={figure}
                                        usedO={usedO}
                                        xMove={xMove}
                                        showCellsOnDragStart={showCellsOnDragStart}
                                        setAvailable={setAvailable}
                                        setOverridable={setOverridable}
                                        winningLine={winningLine}
                                        pair={FightPairs[pair - 1]}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={handleReset} className="py-2 px-4 bg-white rounded-xl">
                    Reset
                </button>
            </div>
            {winningLine ? <LineTo from={String(winningLine[0])} to={String(winningLine[2])} borderWidth={4} borderStyle="" delay={1000} /> : null}
        </>
    );
}

export default App;
