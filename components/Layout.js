import Sidebar from '@/components/Sidebar';


export default function Layout({children}) {
  return (
    <div className='flex max-h-screen'>
      <div className='max-w-xs w-full'>
        <Sidebar/>
      </div>
      <div className='flex-1 px-10 py-20 overflow-auto'>
        {children}
      </div>
    </div>
  );
}
