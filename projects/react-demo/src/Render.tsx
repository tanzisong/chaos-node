import React from 'react';
import s from './css/Render.scss';

function Render() {
  return (
    <div className={s.container}>
      <div className={s.screen}>实际在这里进行render</div>

      <div className={s.left}>1</div>

      <div className={s.center}>
        {/*这里是控制层*/}
        <div className={s.wrapper}>
          <div className={s.box1} />
        </div>
      </div>

      <div className={s.right}>
        <div className="p-20 w-auto">这里使用了Tailwind css</div>
      </div>
    </div>
  );
}

export default Render;
