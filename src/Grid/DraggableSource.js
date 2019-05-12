import React, { useState } from "react";
import Draggable from "react-draggable";


const elementIsInChain = (elementToTraverse,elementToFind) => {
  if(elementToTraverse === elementToFind){
    return elementToFind
  }
  if(elementToTraverse.parentElement){
    return elementIsInChain(elementToTraverse.parentElement, elementToFind)
  }
  return false
}

const DraggableSource = ({
  targetRef,
  dispatch,
  onDrag,
  onStop,
  children,
  ...rest
}) => {
  // item is not visibile if it is inserted.. as the acutual grid item should be displayed then
  const [inserted, setInserted] = useState(false);
  const onDragOverwrite = (e, data) => {
    if (onDrag) onDrag(e, data);
    const target = elementIsInChain(e.target, targetRef.current)
    if (!target && inserted) {
      dispatch({ type: "clearTemp" });
      setInserted(false);
      const placeHolder = document.querySelector(".react-grid-placeholder");
      if (placeHolder) placeHolder.style.transform = "translate(-8000px, 0px)";
      return;
    }
    if (target && !inserted) {
      dispatch({ type: "addTemp", mouseEvent: {clientX: e.clientX, clientY: e.clientY} });
      setInserted(true);
      return;
    }
  };
  const onStopOverwrite = (e, data) => {
    if (onStop) onStop(e, data);
    if (inserted) {
      dispatch({ type: "finaliseTemporaryItem" });
      setInserted(false);
    } else {
      dispatch({ type: "clearTemp" });
    }
  };
  return (
    <div style={{ visibility: inserted ? "hidden" : "visible" }}>
      <Draggable
        onDrag={onDragOverwrite}
        onStop={onStopOverwrite}
        {...rest}
        position={{ x: 0, y: 0 }}
      >
        {children}
      </Draggable>
    </div>
  );
};

export default DraggableSource