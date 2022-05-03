import { NextPage } from 'next';
import Image from 'next/image';
import Card from '../components/Card';
import MHead from '../components/MHead';
import NotionIcon from '../images/notion.png';
import NotionAvatar from '../images/notion-avatar.png';

const cards = [
  {
    path: 'life',
    title: '🏖  Life',
    description:
      'Casual stuff in my life, including cooking recipes, games, the piano, and more!',
  },
  {
    path: 'work',
    title: '💼  Work',
    description:
      'My work at Yahoo!, Google, and my chat notes with professionals from top tech companies!',
  },
  {
    path: 'dev',
    title: '🖥  Dev',
    description:
      'Detailed walkthrough of the technical decisions I made in my personal & startup projects, including this one!',
  },
  {
    path: 'finance',
    title: '🤑  Finance',
    description:
      'Personal finacne tips & absolutely subjective stock analysis to survive in evil capitalist countries!',
  },
];

function Home() {
  return (
    <>
      <MHead title="InstaBlog" />
      <main className="bg-notion-white px-12 md:px-72 min-h-screen pt-8">
        <div>
          <Image src={NotionAvatar} alt="" width={120} height={120} />
          <div className="font-bold text-lg">hey there! 👋</div>
          <div>I&apos;m Tristan Que</div>
          <div>
            {'>'} This is the single Blog Publisher to share your ideas in top
            social medias such as Reddit, Medium, Zhihu, and Xiaohongshu (and
            more is coming!)
          </div>
        </div>
        <div className="w-7/12">
          <div className="mt-10 mb-5">
            Check out my notes from UCLA and other top institutions!
          </div>
          <Card title="Doc" path="doc">
            My Tech Documentation
          </Card>
        </div>
        <div className="mb-5 mt-3">Also, check out my published blogs!</div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 justify-center lg:grid-cols-2">
          {cards.map((c) => (
            <Card title={c.title} key={c.path} fixHeight path={c.path}>
              {c.description}
            </Card>
          ))}
        </div>
      </main>
      <footer className="w-screen justify-center flex sm:mt-4 align-bottom">
        <div className="mr-5 flex align-middle">
          <Image alt="" src={NotionIcon} width={30} height={30} />
        </div>
        <p className="self-center">
          Powered by my favorite all-in-one workspace - Notion
        </p>
      </footer>
    </>
  );
}

const HomePage: NextPage = Home;

export default HomePage;
