import React, { ReactNode, useEffect, useState } from 'react';
// import Root from '../../../packages/entrance/src/react/Root/index';
import { ReactRender, AST } from '@chaos/dsl';
import { InitSystem } from './init';
import { SDK } from '@chaos/sdk';

function App() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    InitSystem()
      .then((_) => {
        setStatus(true);
      })
      .catch((err) => {
        throw Error(`初始化错误: ${err}`);
      });
  }, []);

  return status && <div className="App">{ReactRender(AST, SDK.component.getAll())}</div>;
}

export default App;
