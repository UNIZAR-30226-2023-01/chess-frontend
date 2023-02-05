import Layout from '@/components/Layout';

export default function Home() {
  return (
    <div className='w-full'>
      asd
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
