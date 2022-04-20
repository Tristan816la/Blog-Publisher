import React from "react";

type Props = {
  children: any;
};
const TextWrapper = ({ children }: Props) => {
  return <div className="flex justify-center">{children}</div>;
};

export default TextWrapper;
