import React from 'react';

type Props = {
  children: any;
};
function TextWrapper({ children }: Props) {
  return <div className="flex justify-center">{children}</div>;
}

export default TextWrapper;
