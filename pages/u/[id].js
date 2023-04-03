import Layout from '@/components/Layout';
import { profileTabs } from '@/data/tabs';
import Profile from '@/components/u/Profile';
import Settings from '@/components/u/Settings';

import {profile} from '@/data/users';
import { useState } from 'react';
import Games from '@/components/u/Games';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function User() {
  const [currentTab, setCurrentTab] = useState(profileTabs[0].name);

  return (
    <>
      <div className="flex h-screen">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <div className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt="" />
                  </div>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 object-cover rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <h1 className="truncate text-2xl font-bold text-left text-gray-900 dark:text-white">{profile.name}</h1>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200 dark:border-gray-200/50">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {profileTabs.map((tab, index) => (
                          <button
                            key={tab.name}
                            onClick={() => setCurrentTab(tab.name)}
                            className={classNames(
                              currentTab === tab.name ?
                                'border-indigo-500 text-gray-900 dark:text-white' :
                                'border-transparent text-gray-500 dark:text-white/60 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                            )}
                            aria-current={currentTab === tab.name}
                          >
                            {tab.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Description list */}
                <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
                  {currentTab === profileTabs[0].name && <Profile profile={profile}/>}
                  {currentTab === profileTabs[1].name && <Games />}
                  {currentTab === profileTabs[2].name && <Settings/>}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

User.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps() {
  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify`, {
    method: 'POST',
    credentials: 'include',
  }).catch((err)=>console.log(err));

  if (process.env.NODE_ENV === 'production' && !(res.ok && res.status === 200)) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
