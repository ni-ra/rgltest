import {  merge, keyBy } from "lodash";

let layoutReducerOk = (state, action) => {
    switch (action.type) {
      //add a temporary item (if none already exists)
      //this is used when hovering with a DraggableSource over the grid
      //the action is expected to have an mouseEvent attribute with clientX and clientY attributes
      //this is used to tell react-grid-layout where the newly created item in the grid should be moved
      //after the mocked mousedown event.
      case "addTemp":
        if (state.findIndex(item => item.temp) !== -1) {
          return state;
        }
        const maxX = state.reduce(
          (val, item) => (item.x + item.h > val ? item.x + item.h : val),
          0
        );
        const maxY = state.reduce(
          (val, item) => (item.y + item.w > val ? item.y + item.w : val),
          0
        );
        return [
          ...state,
          {
            x: maxX + 1,
            y: maxY + 1,
            h: action.h ? action.h : 1,
            w: action.w ? action.w : 1,
            content: action.content ? action.content : String.fromCharCode(65 + state.length),
            temp: true,
            mouseEvent: action.mouseEvent,
            i: "" + state.length
          }
        ];
      //removes temporary elements
      //this is used when dragging a DraggableSource outside the grid
      case "clearTemp":
        return state.filter(item => !item.temp);
      //finalise the temporary item
      //this is used when dragging a draggablesource over the grid and letting go (mouseup)
      case "finaliseTemporaryItem":
        return state.map(item => ({ ...item, temp: false }));
      //when the whole layout shall be replaced
      //used on onLayoutChange from grid layou
      case "newLayout":
        if (state.findIndex(item => item.temp) !== -1) {
          return state;
        }
        //react-grid-layout only returns the required keys for layouting
        //we have to merge the previous state, if we want to save other data in the array
        var merged = merge(keyBy(state, 'i'), keyBy(action.layout, 'i'));
        return Object.values(merged);
      default:
        return state;
    }
  };
  const logReducer = reducer => (state, action, ...args)=>{
    const newState = reducer(state, action, ...args)
    console.log('Action', action)
    console.log('State', newState)
    return newState
  }
  
  const layoutReducer = logReducer(layoutReducerOk)

  export default layoutReducer