# React Grid Layout Test Repo

Trying to add items from outside the grid.

- A new grid item is created when dragging a \<DraggableSource/>-Element into the grid layout
    -   The item has the current mouse coordinates as properties
    -   The item is flagged as a temporary element
- Grid Items are Wrapped in <GridElement/>-Containers
    - if the element is based on a temporary item:
        - send a 'mousedown' event
        - overwrite the grid element's getBoundingClientRect function to return the mouse coordinates once. This is done to fix the initial drag position 
