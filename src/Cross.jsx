import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { DragDropContainer } from "react-drag-drop-container";

const Cross = (props) => {
    const [isDropped, setIsDropped] = useState(false);

    if (isDropped) return;

    return (
        <DragDropContainer
            targetKey="foo"
            onDragStart={() => console.log("start")}
            onDrop={() => {
                // if (props.x.includes(props.index)) {
                //     console.log("props.x includes");
                //     setIsDropped(true);
                // }
                console.log("from Cross:" + props.x);
            }}
            dragData={{ type: "x", size: props.size }}
        >
            <FiX
                key={"X" + props.size}
                //   className={`text-[${(figure + 1) * 10}px]`}
                style={{ fontSize: `${(props.size + 3) * 8}px` }}
                //   className="mx-auto"
            />
        </DragDropContainer>
    );
};

export default Cross;
