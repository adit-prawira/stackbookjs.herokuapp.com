import React from "react";
import "../styles/resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;

    if (direction === "horizontal") {
        resizableProps = {
            maxConstraints: [window.innerWidth * 0.3, Infinity],
            minConstraints: [window.innerWidth * 0.75, Infinity],
            height: Infinity,
            width: Infinity,
            resizeHandles: ["e"],
        };
    } else {
        resizableProps = {
            maxConstraints: [Infinity, window.innerHeight * 0.9],
            minConstraints: [Infinity, window.innerHeight * 0.3],
            height: 300,
            width: Infinity,
            resizeHandles: ["s"],
        };
    }
    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
