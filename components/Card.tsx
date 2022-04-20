import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  children: any;
};

const Card = ({ title, children }: Props) => {
  return (
    <Link href={`/${title}`}>
      <a>
        <div className='border px-12 py-10 rounded hover:cursor-pointer hover:ease-in hover:shadow-md'>
          <div className='font-extrabold'>{title}</div>
          <div>{children}</div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
