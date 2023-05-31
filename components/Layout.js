import { useState, useEffect } from 'react';
import { Bars3Icon} from '@heroicons/react/24/outline';
import MSidebar from '@/components/sidebar/MSidebar';
import DSidebar from '@/components/sidebar/DSidebar';
import SearchGame from '@/components/SearchGame';
import { useRouter } from 'next/router';
import GameModal from '@/components/GameModal';
import { useChess } from '@/context/ChessContext';
import { useGame } from '@/context/GameContext';
import useKeyPress from '@/hooks/useKeyPress';

export default function Layout({children}) {
  const router = useRouter();
  const { inQueue, setInQueue, switchModal } = useChess();
  const { cancelSearch, setToken } = useGame();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {user} = children.props;

  useEffect(() => {
    setToken(user.token);
  }, []);

  useKeyPress('j', () => switchModal());
  useKeyPress('h', () => router.push('/home'));
  useKeyPress('t', () => (user && user.username !== 'guest') ? router.push('/tournaments') : null);
  useKeyPress('c', () => (user && user.username !== 'guest') ? router.push('/ranking') : null);
  useKeyPress('p', () => (user && user.username !== 'guest') ? router.push('/u/' + user.id) : null);

  return (
    <div className='h-screen overflow-hidden'>
      <MSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />
      {/* Static sidebar for desktop */}
      <DSidebar
        user={user}
      />
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
      <GameModal user={user}/>
      {inQueue && <SearchGame onCancel={() => {
        setInQueue(false);
        cancelSearch();
      }}/>}
    </div>
  );
}
