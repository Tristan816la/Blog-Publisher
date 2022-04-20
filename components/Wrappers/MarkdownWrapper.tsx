import React from "react";

type Props = {
  children: any;
};

const MarkdownWrapper = ({ children }: Props) => {
  return (
    <article className="prose prose-slate prose-headings:text-center">
      {children}
    </article>
  );
};

export default MarkdownWrapper;
