/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  children: any;
  fixHeight?: boolean;
  path: string;
};

function Card({ title, children, fixHeight, path }: Props) {
  return (
    <Link href={`/${path}`}>
      <a>
        <div
          className={`border px-12 py-10 hover:cursor-pointer hover:ease-in hover:shadow-md ${
            fixHeight && 'lg:h-48'
          } rounded-lg`}
        >
          <div className="font-extrabold">{title}</div>
          <div>{children}</div>
        </div>
      </a>
    </Link>
  );
}

Card.defaultProps = {
  fixHeight: false,
};

export default Card;
