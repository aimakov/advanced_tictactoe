import React, { useState, useEffect } from "react";
import { DragDropContainer } from "react-drag-drop-container";

const Circle = (props) => {
    const [isDropped, setIsDropped] = useState(false);

    useEffect(() => {
        if (props.usedO.includes(props.index)) {
            // console.log("props.x includes");
            setIsDropped(true);
        }
    }, [props.usedO]);

    if (isDropped) return;

    const handleDragEnd = () => {
        props.setAvailable([]);
        props.setOverridable([]);
    };

    return (
        <DragDropContainer
            targetKey="foo"
            // onDragStart={() => console.log("start")}
            // onDrop={() => setIsDropped(true)}
            dragData={{ type: "o", size: props.size, index: props.index }}
            noDragging={props.xMove || props.winningLine}
            onDragStart={() => props.showCellsOnDragStart("o", props.size, props.index)}
            onDragEnd={handleDragEnd}
        >
            <div
                key={"O" + props.size}
                style={{
                    width: `${(props.size + 3) * 6}px`,
                    height: `${(props.size + 3) * 6}px`,
                }}
                className="rounded-[50%] border-4 border-black mx-auto"
            ></div>
        </DragDropContainer>
    );
};

export default Circle;
