import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { DragDropContainer } from "react-drag-drop-container";

const Cross = (props) => {
    const [isDropped, setIsDropped] = useState(false);

    useEffect(() => {
        if (props.usedX.includes(props.index)) {
            // console.log("props.x includes");
            setIsDropped(true);
        }
    }, [props.usedX]);

    if (isDropped) return;

    const handleDragEnd = () => {
        props.setAvailable([]);
        props.setOverridable([]);
    };

    return (
        <DragDropContainer
            targetKey="foo"
            onDragStart={() => props.showCellsOnDragStart("x", props.size, props.index)}
            onDragEnd={handleDragEnd}
            // onDragStart={() => console.log("starting")}
            noDragging={!props.xMove}
            dragData={{ type: "x", size: props.size, index: props.index }}
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
