import { useEffect, useState } from "react";
import LineTo from "react-lineto";
import { FiX } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import DropZone from "./DropZone";
import Cross from "./Cross";
import Circle from "./Circle";
import PickPairs from "./PickPairs";
import Popup from "./Popup";

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

    const [popUpText, setPopUpText] = useState("");

    const [gameCell, setGameCell] = useState({});

    const [pair, setPair] = useState();

    const showCellsOnDragStart = (type, size, index) => {
        let initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        if (type === "x") {
            let tempOver, tempAvail;
            tempOver = initialCells.filter((cell) =>
                Object.entries(gameCell)
                    .filter((temp) => temp[1].type === "o" && temp[1].size < size)
                    .reduce((array, element) => {
                        array.push(Number(element[0]));
                        return array;
                    }, [])
                    .includes(cell)
            );
            setOverridable(tempOver);
            // setOverridable(
            //     initialCells.filter((cell) =>
            //         Object.entries(gameCell)
            //             .filter((temp) => temp[1].type === "o" && temp[1].size < size)
            //             .reduce((array, element) => {
            //                 array.push(Number(element[0]));
            //                 return array;
            //             }, [])
            //             .includes(cell)
            //     )
            // );
            tempAvail = initialCells.filter((cell) => !x.includes(cell) && !o.includes(cell));
            setAvailable(tempAvail);

            // setAvailable(initialCells.filter((cell) => !x.includes(cell) && !o.includes(cell)));
            setNotAvailable(initialCells.filter((cell) => !tempAvail.includes(cell) && !tempOver.includes(cell)));
        }

        if (type === "o") {
            let tempOver, tempAvail;
            tempOver = initialCells.filter((cell) =>
                Object.entries(gameCell)
                    .filter((temp) => temp[1].type === "x" && temp[1].size < size)
                    .reduce((array, element) => {
                        array.push(Number(element[0]));
                        return array;
                    }, [])
                    .includes(cell)
            );
            setOverridable(tempOver);

            // setOverridable(
            //     initialCells.filter((cell) =>
            //         Object.entries(gameCell)
            //             .filter((temp) => temp[1].type === "x" && temp[1].size < size)
            //             .reduce((array, element) => {
            //                 array.push(Number(element[0]));
            //                 return array;
            //             }, [])
            //             .includes(cell)
            //     )
            // );
            tempAvail = initialCells.filter((cell) => !x.includes(cell) && !o.includes(cell));
            setAvailable(tempAvail);
            setNotAvailable(initialCells.filter((cell) => !tempAvail.includes(cell) && !tempOver.includes(cell)));

            // setAvailable(initialCells.filter((cell) => !x.includes(cell) && !o.includes(cell)));
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

    const checkWinStatus = () => {
        if (winningLine) return true;
        return false;
    };

    // useEffect(() => {
    //     let initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //     if (available.length === 0 && overridable.length === 0) setNotAvailable([]);
    //     else setNotAvailable(initialCells.filter((cell) => !available.includes(cell) && !overridable.includes(cell)));
    // }, [available, overridable]);

    useEffect(() => {
        if (notAvailable.length === 9) {
            setPopUpText("Tie - the board is full.");
        }
        // console.log(notAvailable.length);
    }, [notAvailable]);

    useEffect(() => {
        let tempX, tempO;

        winningCombinations.forEach((winningCombination) => {
            if (winningCombination.every((v) => x.includes(v))) {
                tempX = winningCombination;
            }
            if (winningCombination.every((v) => o.includes(v))) {
                tempO = winningCombination;
            }
        });

        if (tempX) {
            setWinningLine(tempX);
            setPopUpText("Top player won!");
        } else if (tempO) {
            setWinningLine(tempO);
            setPopUpText("Bottom player won!");
        }
        // } else if (Object.entries(gameCell).length > 8) setPopUpText("Tie - the board is full.");
    }, [gameCell]);

    useEffect(() => {
        console.log(Object.entries(gameCell).length);
        if (usedO.length === 6 && usedX.length === 6) setPopUpText("Tie - no elements left.");
    }, [gameCell]);

    const handleReset = () => {
        // window.location.reload(false);
        setPair();
        setXMove(true);
        setX([]);
        setO([]);
        setUsedX([]);
        setUsedO([]);
        setWinningLine();
        setPopUpText("");
        setGameCell({});
    };

    if (!pair)
        return (
            <div className="w-screen overscroll-contain h-screen touch-none overflow-y-hidden bg-[#e0e0e0] flex flex-col justify-center items-center">
                <div className=" h-3/4 -translate-y-6 p-6 w-4/5 max-w-xl touch-none bg-[#e0e0e0] shadow-[20px_20px_60px_#bebebe,_-20px_-20px_60px_#ffffff] rounded-[50px] relative flex flex-col justify-center items-center ">
                    <PickPairs pairs={FightPairs} setPair={setPair} />
                </div>
            </div>
        );

    return (
        <>
            <div className="w-screen h-screen touch-none overflow-y-hidden bg-[#e0e0e0] flex flex-col justify-center items-center gap-4">
                {/* <h2 className=" absolute top-0 left-2/4 -translate-x-2/4 p-4 text-[1.5rem] text-neutral-300 font-medium font-mono">
                    Welcome to the Next Level TicTacToe
                </h2> */}
                {popUpText ? <Popup popUpText={popUpText} setPopUpText={setPopUpText} /> : null}

                <div className=" w-[90%] max-w-2xl p-6 bg-[#e0e0e0] shadow-[20px_20px_60px_#bebebe,_-20px_-20px_60px_#ffffff] rounded-[50px] relative flex flex-col justify-center items-center ">
                    <div className="w-full h-full flex flex-col justify-center gap-6 items-center ">
                        <div className="grid grid-cols-7 max-w-xl justify-center items-center w-full text-center mr-10 h-[90px]">
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
                                        setNotAvailable={setNotAvailable}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="  gap-2 grid grid-cols-3 grid-rows-3 justify-items-center items-center">
                            {[...Array(9).keys()].map((cell) => (
                                <div
                                    className={`w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] bg-blue-300 rounded-lg flex justify-center items-center ${cell}`}
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

                        <div className="grid grid-cols-7 max-w-xl justify-around items-center w-full mr-10 h-[90px]">
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
                                        setNotAvailable={setNotAvailable}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleReset}
                    className="py-2 px-4 bg-[#e0e0e0] hover:bg-[#bfbfbf] transition-all duration-300 shadow-[7px_7px_13px_#bebebe,_-7px_-7px_13px_#ffffff] rounded-[10px]"
                >
                    Reset
                </button>
                <div>
                    <p className="font-light">
                        <span>developed</span> <span>by </span>
                        <a className=" font-mono" href="https://www.instagram.com/aimakov.dev">
                            @aimakov.dev
                        </a>
                    </p>
                    <p className=" font-light text-xs flex justify-between">
                        <span>icons</span> <span>adapted</span> <span>from</span>{" "}
                        <a className=" font-mono" href="https://www.deviantart.com/thelivingethan">
                            thelivingethan
                        </a>
                    </p>
                </div>
            </div>
            {winningLine ? <LineTo from={String(winningLine[0])} to={String(winningLine[2])} borderWidth={2} borderStyle="" delay={1000} /> : null}
        </>
    );
}

export default App;
