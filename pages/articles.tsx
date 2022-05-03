import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { Fragment } from 'react';
import NotionService from '../services/notion';
import { IArticle } from '../@types/types.d';
import TextWrapper from '../components/Wrappers/TextWrapper';

type Props = {
  articles: IArticle[];
};

function Home({ articles }: Props) {
  return (
    <>
      Check out my articles!
      <TextWrapper>
        {articles.map((a) => (
          <Link href={`/articles/${a.id}`} key={a.id}>
            {a.child_page.title}
          </Link>
        ))}
      </TextWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const articles = await notionService.getPage(
    process.env.NEXT_PUBLIC_ARTICLES_ID as string,
  );
  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
};

export default Home;
