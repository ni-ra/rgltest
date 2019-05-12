import React, { useRef, useEffect } from "react";
import { pick } from 'lodash'

const createDragStartEvent = (element, mouseEvent) => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("mousedown", true, true);
  
    // fake getBoundingClientRect for one call
    // this way, we can influence where the drag action is started
    const original = element.getBoundingClientRect;
    element.getBoundingClientRect = () => {
      element.getBoundingClientRect = original;
      return {
        left: mouseEvent.clientX,
        top: mouseEvent.clientY
      };
    };
    element.dispatchEvent(event);
  };
  
  const createDragStopEvent = element => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("mouseup", true, true);
  };
  
  const GridElement = ({ temp, children, mouseEvent, ...rest }) => {
    const forwardProps = pick(rest, [
      "style",
      "className",
      "onMouseDown",
      "onMouseUp",
      "onTouchEnd",
      "onTouchStart"
    ]);
  
    const ref = useRef();
  
    //fake the drag start event if its a new element with property temp
    useEffect(() => {
      const refCur = ref && ref.current;
      if (refCur && temp) {
        createDragStartEvent(refCur, mouseEvent);
      }
      return () => refCur && temp && createDragStopEvent(refCur);
    }, [ref, temp, mouseEvent]);
  
    return (
      <div ref={ref} {...forwardProps}>
        {children}
      </div>
    );
  };

  export default GridElement