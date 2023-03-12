import Layout from '@/components/Layout';

export default function Home() {
  return (
    <div className='w-full'>

    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export async function getServerSideProps({req}) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
