import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { FiX } from "react-icons/fi";

const DropZone = (props) => {
    const [item, setItem] = useState();

    const handleDrop = (e) => {
        const data = {
            type: e?.dragData?.type,
            size: e?.dragData?.size,
        };

        console.log(data);
        console.log(props.index);

        if (!item) {
            setItem(data);
            return;
        }

        if (item.size < e.dragData.size) {
            console.log("sfsd");
            let temp = [...props.x, props.index];
            console.log("from dropzone temp" + temp);
            props.setX(temp);
            setItem(data);
        }

        // setXMove(false);
    };

    return (
        <DropTarget targetKey="foo" onHit={(e) => handleDrop(e)}>
            <div className="w-[120px] h-[120px] flex justify-center items-center">
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
