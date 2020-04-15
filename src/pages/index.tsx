import { NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@components/Atoms';

// Props Type
type IndexPageProps = {
  initialProp: string;
};

// Component
const IndexPage: NextPage<IndexPageProps> = ({ initialProp }) => {
  return (
    <>
      <Link href="/login">
        <Button color="primary" variant="outlined">
          Go Login
        </Button>
      </Link>
      <div>{initialProp}</div>
    </>
  );
};

// Initial Props
IndexPage.getInitialProps = async () => {
  const initialProp = 'Index Page';

  return { initialProp };
};

// Export
export default IndexPage;
