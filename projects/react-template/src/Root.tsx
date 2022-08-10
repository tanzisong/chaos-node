import React, { useEffect, useState } from 'react';
import { ReactRender, AST } from '@chaos/dsl';
import { SDK } from '@chaos/sdk';

import { InitSystem } from './init';

function Root() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    InitSystem()
      .then((_) => setStatus(true))
      .catch((err) => {
        throw Error(`初始化错误: ${err}`);
      });
  }, []);

  return status && <div>{ReactRender(AST, SDK.component.getAll())}</div>;
}

export default Root;
