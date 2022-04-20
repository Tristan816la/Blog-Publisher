import React, { Fragment } from "react";
import Head from "next/head";

type Props = {
  title: string;
  type?: string;
  image?: string;
  url?: string;
};

const MHead = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name={"og:title"} title={"og:title"} content={title} />
      <meta name={"og:description"} title={"og:description"} content={title} />
    </Head>
  );
};

export default MHead;
