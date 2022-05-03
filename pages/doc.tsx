import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next/types';
import NotionService from '../services/notion';
import { IDatabase, ISelectOp } from '../@types/types.d';

type Props = {
  docs: IDoc[];
};

interface IDoc {
  title: any;
  pid: string;
  description: string;
  icon: string;
  tags: ISelectOp[];
}

function Docs({ docs }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 px-60">
      <strong className="text-3xl mt-5 border-b border-dashed pb-3">Doc</strong>
      {docs.map((d) => (
        <button
          key={d.pid}
          onClick={() => router.push(`/doc/${d.pid}`)}
          type="button"
          className="text-left flex flex-col gap-5"
        >
          <div className="flex gap-1 font-bold">
            <div>{d.icon}</div>
            <div>{d.title}</div>
          </div>
          <div>{d.description}</div>
          <div className="flex gap-3">
            {d.tags.map((t) => (
              <div key={t.id} className={`px-2 py-1 rounded-sm bg-${t.color}`}>
                {t.name}
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const base: IDatabase[] = await notionService.getDatabase(
    process.env.NEXT_PUBLIC_NOTION_ENTRY as string,
  );

  const temp = base.filter((d) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const op of d.properties.Type.multi_select)
      if (op.name === 'docs') return true;
    return false;
  });

  const docs = temp.map((d) => ({
    title: d.properties.Name.title[0].text.content,
    pid: notionService.urlConvert(d.properties.url.rich_text[0].plain_text),
    description: d.properties.Description.rich_text[0].plain_text,
    icon: d.icon.emoji,
    tags: d.properties.Type.multi_select.filter((op) => op.name !== 'docs'),
  }));

  return {
    props: {
      docs,
    },
    revalidate: 60,
  };
};

export default Docs;
