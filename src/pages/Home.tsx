import withDocumentTitle from '@components/withDocumentTitle';

function Home() {
  return <h6 className="tw:underline">Hello Vite + TS + React!</h6>;
}

const HomeWithTitle = withDocumentTitle(Home, { documentTitle: 'Home' });

export default HomeWithTitle;
