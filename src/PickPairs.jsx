import React from "react";
import { FightPairs } from "./assets/Pairs";

const PickPairs = (props) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-[1.5rem] mb-4">Pick your characters:</h2>

            <ul className=" max-h-[90%] overflow-y-auto lg:flex lg:flex-col">
                {props.pairs.map((pair) => (
                    <li className="mx-8 my-2 hover:bg-gray-200 p-2 rounded-xl hover:cursor-pointer" onClick={() => props.setPair(pair.id)}>
                        <h3 className=" text-md text-center">
                            {pair.first} vs {pair.second}
                        </h3>
                        <div className="flex justify-between items-center">
                            <img src={pair.first_png} style={{ width: "70px" }} />
                            <p>vs</p>
                            <img src={pair.second_png} style={{ width: "70px" }} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PickPairs;
