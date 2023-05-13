import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Legal from '@/components/Legal';
import {PrivacyContent} from '@/data/privacy';

export default function Privacy() {
  return (
    <div className='max-w-xl mx-auto flex flex-col gap-y-4 py-12 antialiased px-4 sm:px-0'>
      <h1 className='text-2xl font-bold text-center py-4'>{PrivacyContent.title}</h1>
      <p className='text-sm tracking-wide'>
        {PrivacyContent.introduction}
      </p>
      <div className=''>
        {PrivacyContent.subsections.map((subsection, index) => (
          <Legal
            key={index}
            title={subsection.title}
            desciption={subsection.description}
            list={subsection.list}
          />
        ))}
      </div>
    </div>
  );
}

Privacy.getLayout = (page) => {
  return (
    <div className='w-full'>
      <Navbar/>
      <main className='container mx-auto'>
        {page}
      </main>
      <Footer/>
    </div>
  );
};
