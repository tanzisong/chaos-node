import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from './DragComponent/container';
import DragItem from './DragComponent/dragItem';
import Sort from './DragComponent/sort/container';

function Drag() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ height: '200px' }}>
        <div>
          <Container />
        </div>
        <div>
          <DragItem name="name1" />
          <DragItem name="name2" />
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Sort />
      </div>
    </DndProvider>
  );
}

export default Drag;
