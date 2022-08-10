import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { FiX } from "react-icons/fi";
import { arrayRemove } from "./functions/arrayRemove";

const DropZone = (props) => {
    const [item, setItem] = useState();

    const handleDrop = (e) => {
        const data = {
            type: e?.dragData?.type,
            size: e?.dragData?.size,
        };

        if (!item) {
            setItem(data);
            if (e.dragData.type === "x") {
                let temp = [...props.x, props.index];
                props.setX(temp);
                props.setUsedX([...props.usedX, e.dragData.index]);
                props.setXMove(false);

                let tempCell = props.gameCell;
                temp = props.index;

                tempCell[temp] = { type: e.dragData.type, size: e.dragData.size };
                props.setGameCell(tempCell);
            } else if (e.dragData.type === "o") {
                let temp = [...props.o, props.index];
                props.setO(temp);
                props.setUsedO([...props.usedO, e.dragData.index]);
                props.setXMove(true);

                let tempCell = props.gameCell;
                temp = props.index;
                tempCell[temp] = { type: e.dragData.type, size: e.dragData.size };
                props.setGameCell(tempCell);
            }
            return;
        }

        if (item.size < e.dragData.size) {
            if (item.type !== e.dragData.type) {
                if (e.dragData.type === "x") {
                    let temp = [...props.x, props.index];
                    props.setX(temp);
                    props.setUsedX([...props.usedX, e.dragData.index]);
                    props.setO(arrayRemove([...props.o], props.index));
                    props.setXMove(false);

                    let tempCell = props.gameCell;
                    temp = props.index;
                    tempCell[temp] = { type: e.dragData.type, size: e.dragData.size };
                    props.setGameCell(tempCell);
                } else if (e.dragData.type === "o") {
                    let temp = [...props.o, props.index];
                    props.setO(temp);
                    props.setUsedO([...props.usedO, e.dragData.index]);
                    props.setX(arrayRemove([...props.x], props.index));
                    props.setXMove(true);

                    let tempCell = props.gameCell;
                    temp = props.index;
                    tempCell[temp] = { type: e.dragData.type, size: e.dragData.size };
                    props.setGameCell(tempCell);
                }
            }
            setItem(data);
        }

        // setXMove(false);
    };

    return (
        <DropTarget targetKey="foo" onHit={(e) => handleDrop(e)}>
            <div
                className={`w-[120px] h-[120px] flex justify-center items-center ${props.overridable.includes(props.index) ? "bg-yellow-500" : ""}  ${
                    props.available.includes(props.index) ? "bg-green-500" : ""
                } `}
            >
                {item?.type === "x" && (
                    <div>
                        {
                            <FiX
                                key={"X" + item.size}
                                //   className={`text-[${(figure + 1) * 10}px]`}
                                style={{ fontSize: `${(item.size + 3) * 8}px` }}
                                //   className="mx-auto"
                            />
                        }
                    </div>
                )}
                {item?.type === "o" && (
                    <div
                        key={"O" + item.size}
                        style={{
                            width: `${(item.size + 3) * 6}px`,
                            height: `${(item.size + 3) * 6}px`,
                        }}
                        className="rounded-[50%] border-4 border-black mx-auto"
                    ></div>
                )}
            </div>
        </DropTarget>
    );
};

export default DropZone;
