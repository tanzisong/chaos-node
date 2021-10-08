import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';

export interface BoxProps {
  name: string;
}
interface DropResult {
  name: string;
}
const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

export default ({ name }: { name: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Symbol.for('drag'),
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.info(item, dropResult);
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} role="Box" style={{ ...style, opacity }} data-testid={`box-${name}`}>
      {name}
    </div>
  );
};
