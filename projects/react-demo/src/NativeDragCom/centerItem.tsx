import React from 'react';

const CenterItem = (props: any) => {
  const { content } = props;
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        background: 'skyblue',
        marginRight: '20px',
        display: 'inline-flex',
      }}
      onDragLeave={() => {
        console.info(content);
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        console.info('onDrop', event.currentTarget, event.dataTransfer.getData('text'));
      }}
    >
      render item ={'>'} {content}
    </div>
  );
};

export default CenterItem;
