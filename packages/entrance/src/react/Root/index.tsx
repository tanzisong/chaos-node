import React, { ReactNode } from 'react';
import './index.scss';

interface Props {
  children: ReactNode;
}

export default function Index(props: Props) {
  const { children } = props;
  const a = null;
  return <div className="root">{children || a}</div>;
}
