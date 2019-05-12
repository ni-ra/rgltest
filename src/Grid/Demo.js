
import React, { useRef, useReducer } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styled from "styled-components/macro";
import DraggableSource from "./DraggableSource";
import GridElement from "./GridElement";
import layoutReducer from "./layoutReducer";

const SourceDummyBlock = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
  border: 1px solid blue;
`;

const initialItems = [
  { i: "0", x: 0, y: 0, w: 1, h: 2, static: true, content: "A" },
  { i: "1", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, content: "B" },
  { i: "2", x: 4, y: 0, w: 1, h: 2, content: "C" }
];


const Grid = () => {
  const ref = useRef();
  const [layout, dispatch] = useReducer(layoutReducer, initialItems);
  return (
    <div>
      <DraggableSource targetRef={ref} dispatch={dispatch} key="1">
        <SourceDummyBlock />
      </DraggableSource>
      <DraggableSource targetRef={ref} dispatch={dispatch} key="2">
        <SourceDummyBlock />
      </DraggableSource>
      <div ref={ref}>
        <GridLayout
          className="layout"
          layout={layout}
          onLayoutChange={layout => dispatch({ type: "newLayout", layout })}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          {layout.map(item => (
            <GridElement
              key={"" + item.i}
              css={{ border: "1px solid red" }}
              {...item}
            >
              {item.content}
            </GridElement>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default Grid;
