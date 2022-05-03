import React from 'react';

type Props = {
  children: any;
};

function MarkdownWrapper({ children }: Props) {
  return (
    <article className='prose prose-slate prose-headings:text-center'>
      {children}
    </article>
  );
}

export default MarkdownWrapper;
