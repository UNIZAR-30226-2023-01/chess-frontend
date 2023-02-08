import Layout from '@/components/Layout';
import Achivement from '@/components/Achivement';

export default function Achive() {
  const achivements = new Array(10).fill(0);
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {achivements.map((_, index) => (
        <li
          key={index}
          className="col-span-1 flex flex-col text-center"
        >
          <Achivement
            imageUrl="https://images.unsplash.com/photo-1589113787162-96abbcd20c2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            name="First Blood"
            title="+ 50 coins"
            unlocked={index % 2 === 0}
          />
        </li>
      ))}
    </ul>
  );
}

Achive.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
