import React, { useState } from 'react';

const bgImg = new Image();
bgImg.src = 'https://js.cx/clipart/ball.svg';

const Left = () => {
  const [imgGroup] = useState([
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic18.nipic.com%2F20120202%2F7919931_150439721000_2.jpg&refer=http%3A%2F%2Fpic18.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634029318&t=580c47d6910494b2a94d7fa0895194e0',
    'https://img1.baidu.com/it/u=2725256892,1346976217&fm=26&fmt=auto&gp=0.jpg',
  ]);

  /**
   * 1: 改变拖拽源的样式
   * 2: 改变拖拽时鼠标剪头样式 => 好像目前看来只能在onDragOver事件中改变dropEffect属性来改变鼠标样式
   * */
  return (
    <div>
      {imgGroup.map((img, index) => (
        <div
          key={img}
          draggable={true}
          style={{ display: 'inline-flex' }}
          onDragStart={(event) => {
            event.dataTransfer.setDragImage(bgImg, 0, 0);
            event.dataTransfer.setData('text', index + '');
          }}
        >
          <img
            draggable={false}
            src={img}
            alt="img"
            style={{
              width: '100px',
              height: '100px',
              marginRight: '20px',
              borderRadius: '5px',
              cursor: 'move',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Left;
