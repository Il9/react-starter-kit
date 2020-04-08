import { NextPage } from 'next';

const IndexPage: NextPage<{ temp: string }> = ({ temp }) => <div>{temp}</div>;

IndexPage.getInitialProps = async () => {
  return { temp: '테스트 입니다.' };
};

export default IndexPage;
