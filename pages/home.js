import Layout from '@/components/Layout';

export default function Home() {
  return (
    <div className='w-full'>
      pepe
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
