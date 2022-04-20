import { GetStaticProps } from "next/types";
import React from "react";
import NotionService from "../../services/notion";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Article } from "../@types/types.d";
import Head from "next/head";
import TextWrapper from "../../components/TextWrapper";

type Props = {
  article: any;
  post: any;
};

const Article = ({ article, post }: Props) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name={"og:title"} title={"og:title"} content={post.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={post.title}
        />
      </Head>
      <main className="mx-auto">
        <TextWrapper>
          <article className="prose prose-slate prose-headings:text-center">
            <ReactMarkdown remarkPlugins={[gfm]}>{article}</ReactMarkdown>
          </article>
        </TextWrapper>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const { markdown, post } = await notionService.getPageContent(
    context.params?.aid as string
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
  const articles: Article[] = await notionService.getPage(
    process.env.NEXT_PUBLIC_ARTICLES_ID as string
  );

  const paths = articles.map((a) => `/articles/${a.id}`);
  return {
    paths,
    fallback: false,
  };
}

export default Article;
