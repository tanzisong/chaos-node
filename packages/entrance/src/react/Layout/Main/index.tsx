import React from 'react';

export default function Main(props: any) {
  return <div className="overflow-auto">{props.children}</div>;
}
