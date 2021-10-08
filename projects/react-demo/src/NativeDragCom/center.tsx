import React from 'react';
import CenterItem from './centerItem';

const Center = () => {
  return (
    <div
      onDrop={(event) => {
        event.preventDefault();
        event.currentTarget.style.background = 'green'; // 无法改变拖拽时的手势样式
        console.info('onDrop', event.dataTransfer.getData('text'));
      }}
      onDragOver={(event) => {
        // console.info('onDragOver', event);
        event.dataTransfer.effectAllowed = 'none';
        event.dataTransfer.dropEffect = 'move';
        // console.info('onDragOver', event.dataTransfer.getData('text')); // => 获取不到
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        console.info('onDragEnter', event.dataTransfer.getData('text')); // => 获取不到
        event.currentTarget.style.background = 'red'; // 无法改变拖拽时的手势样式
        console.info(event.currentTarget.style);
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        event.currentTarget.style.background = 'green'; // 无法改变拖拽时的手势样式
        event.preventDefault();
      }}
      style={{ width: '70%', height: '70%', background: 'greenyellow' }}
    >
      <CenterItem content="1" />
      <CenterItem content="2" />
    </div>
  );
};

export default Center;
