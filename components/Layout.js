import { useState } from 'react';
import { Bars3Icon} from '@heroicons/react/24/outline';
import MSidebar from '@/components/sidebar/MSidebar';
import DSidebar from '@/components/sidebar/DSidebar';
import { Toaster } from 'react-hot-toast';
import Reconnect from '@/components/Reconnect';
import GameModal from '@/components/GameModal';

export default function Layout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const id = children.props.user.id;

  return (
    <>
      <Toaster position='top-right' />
      <div className='h-screen overflow-hidden'>
        <MSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userId={id} />
        {/* Static sidebar for desktop */}
        <DSidebar userId={id}/>
        <div className="flex flex-1 flex-col lg:pl-64 h-full">
          <div className="sticky top-0 z-10 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden bg-gray-800 border-b border-white/20">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-200 hover:text-gray-50 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 h-full bg-white dark:bg-gray-800">
            <div className="h-full overflow-y-auto">
              {children}
            </div>
          </main>
        </div>
        <GameModal/>
        {false && <Reconnect/>}
      </div>
    </>
  );
}
