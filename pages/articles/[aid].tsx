import { GetStaticProps } from 'next/types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import NotionService from '../../services/notion';
import { IArticle } from '../@types/types.d';
import TextWrapper from '../../components/Wrappers/TextWrapper';
import MarkdownWrapper from '../../components/Wrappers/MarkdownWrapper';
import MHead from '../../components/MHead';

type Props = {
  article: any;
  post: any;
};

function Article({ article, post }: Props) {
  return (
    <>
      <MHead title={post.title} />
      <main>
        <TextWrapper>
          <MarkdownWrapper>
            <ReactMarkdown remarkPlugins={[gfm]}>{article}</ReactMarkdown>
          </MarkdownWrapper>
        </TextWrapper>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const { markdown, post } = await notionService.getPageContent(
    context.params?.aid as string,
  );
  return {
    props: {
      article: markdown,
      post,
    },
    revalidate: 600,
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();
  const articles: IArticle[] = await notionService.getPage(
    process.env.NEXT_PUBLIC_ARTICLES_ID as string,
  );

  const paths = articles.map((a) => `/articles/${a.id}`);
  return {
    paths,
    fallback: false,
  };
}

export default Article;
