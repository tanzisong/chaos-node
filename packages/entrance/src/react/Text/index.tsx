import React from 'react';

interface Props {
  innerText: String;
}

export default function Index(props: Props) {
  const { innerText } = props;
  return <div className="text">{innerText}</div>;
}
