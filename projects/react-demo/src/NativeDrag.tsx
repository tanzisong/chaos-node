import React from 'react';

import Left from './NativeDragCom/left';
import Center from './NativeDragCom/center';
import s from './css/Render.scss';

function NativeDrag() {
  return (
    <div className={s.container}>
      <div className={s.left}>
        <Left />
      </div>

      <div className={s.center}>
        <Center />
      </div>

      <div className={s.right}>1</div>
    </div>
  );
}

export default NativeDrag;
