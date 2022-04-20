import { NextPage } from 'next';
import Image from 'next/image';
import Card from '../components/Card';
import { Fragment } from 'react';
import MHead from '../components/MHead';
import NotionIcon from '../images/notion.png';

const cards = [
  {
    title: '🏖  Life',
    description:
      'This is where I post casual stuff in my life, including cooking recipes, games, the piano, and more!',
  },
  {
    title: '💼  Work',
    description:
      'Check out my work at Yahoo!, Google, and my chat notes with professionals from top tech companies!',
  },
  {
    title: '🖥  Dev',
    description:
      "Here I'll walkthrough the technical decisions I made in my personal & class & startup projects, including this one!",
  },
  {
    title: '🤑  Finance',
    description:
      'Personal finacne tips & absolutely subjective stock analysis to survive in evil capitalist countries!',
  },
];

const Home: NextPage = () => {
  return (
    <Fragment>
      <MHead title={'InstaBlog'}></MHead>
      <main className='bg-notion-white px-20 min-h-screen pt-8'>
        <div>
          <div className='font-bold text-lg'>hey there!👋</div>
          <div>
            {'>'} This is the single Blog Publisher to share your ideas in top
            social medias such as Reddit, Medium, Zhihu, and Xiaohongshu (and
            more is coming!)
          </div>
        </div>
        <div className='mb-5'>check out my published blogs!</div>
        <div className='grid grid-cols-1 gap-x-36 gap-y-10 justify-center md:grid-cols-2 md:px-36 px-8'>
          {cards.map((c) => (
            <Card title={c.title} key={c.title}>
              {c.description}
            </Card>
          ))}
        </div>
        <div className='w-7/12'>
          <div className='mt-10 mb-5'>
            Check out my notes from UCLA and other top institutions!
          </div>
          <Card title='Doc'>My Tech Documentation</Card>
        </div>
      </main>
      <footer className='w-screen justify-center flex sm:mt-4 align-bottom'>
        <div className='mr-5'>
          <Image alt='' src={NotionIcon} width={30} height={30} />
        </div>
        <p>Powered by my favorite all-in-one workspace - Notion</p>
      </footer>
    </Fragment>
  );
};

export default Home;
