import react, { useEffect, useState } from "react";

function App() {
    const [xMove, setXMove] = useState(true);
    const [x, setX] = useState([]);
    const [o, setO] = useState([]);

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
            if (winningCombination.every((v) => x.includes(v))) console.log("X won");
        });
    }, [x]);

    useEffect(() => {
        winningCombinations.forEach((winningCombination) => {
            if (winningCombination.every((v) => o.includes(v))) console.log("O won");
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
            <div className=" w-[60%] h-[70%] bg-white rounded-2xl relative">
                <p>{xMove ? "X move" : "O move"}</p>
                <div className=" w-[400px] h-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-3 grid-rows-3 justify-items-center items-center">
                    {[...Array(9).keys()].map((cell) => (
                        <div className="w-[90%] h-[90%] bg-blue-500 hover:bg-blue-300 cursor-pointer" key={cell} onClick={() => handleCellClicked(cell + 1)}>
                            {x.includes(cell + 1) ? "X" : o.includes(cell + 1) ? "O" : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
