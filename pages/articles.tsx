import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import NotionService from "../services/notion";
import { Article } from "./@types/types.d";
import TextWrapper from "../components/TextWrapper";

type Props = {
  articles: Article[];
};

const Home = ({ articles }: Props) => {
  return (
    <Fragment>
      Check out my articles!
      <TextWrapper>
        {articles.map((a) => (
          <Link href={`/articles/${a.id}`} key={a.id}>
            {a.child_page.title}
          </Link>
        ))}
      </TextWrapper>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const articles = await notionService.getPage(
    process.env.NEXT_PUBLIC_ARTICLES_ID as string
  );
  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
};

export default Home;
