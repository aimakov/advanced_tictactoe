import React from "react";
import { useEffect } from "react";

const Popup = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.setPopUpText("");
        }, [3000]);
    });

    return (
        <div className=" animate-slowAppearring z-10 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            {/* <div class="p-3 bg-white shadow rounded-lg">
                <h3 class="text-xs border-b">font-sans</h3>
                <p class="font-sans">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div class="p-3 bg-white shadow rounded-lg">
                <h3 class="text-xs border-b">font-serif</h3>
                <p class="font-serif">The quick brown fox jumps over the lazy dog.</p>
            </div> */}
            <div className="p-8 bg-white shadow rounded-lg flex flex-col gap-4 justify-center items-center">
                <p className="font-mono text-xl">{props.popUpText}</p>
                {/* <button onClick={() => props.setPopUpText("")} className="font-mono p-2 border-lime-600 rounded-lg border-2">
                    close
                </button> */}
            </div>
        </div>
    );
};

export default Popup;
