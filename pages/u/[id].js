import Layout from '@/components/Layout';
import { profileTabs } from '@/data/tabs';
import Profile from '@/components/u/Profile';
import Settings from '@/components/u/Settings';
import jwt from 'jsonwebtoken';
import { useState } from 'react';
import useSWR from 'swr';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const fetcher = (url) => fetch(url, {credentials: 'include'})
    .then(async (res) => {
      const data = await res.json();
      return data?.data;
    });

export default function User({profile, user}) {
  const [currentTab, setCurrentTab] = useState(profileTabs[0].name);
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${profile.id}`, fetcher, {
    fallbackData: profile,
  });

  return (
    <>
      <div className="flex h-screen">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <div className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div className="h-32 w-full lg:h-48 bg-gradient-to-r from-indigo-500 via-30% via-sky-500 to-emerald to-90%"/>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex rounded-full">
                        <img
                          className="h-24 w-24 object-cover rounded-full ring-4 ring-white sm:h-32 sm:w-32 select-none"
                          src={isLoading ? '/assets/profile/animales/1.webp' : `/assets/profile${data?.avatar}`}
                          alt={data?.avatar}
                        />
                      </div>
                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 block">
                          <h1 className="truncate text-2xl font-bold text-left text-gray-900 dark:text-white capitalize">{data?.username}</h1>
                          <span className="truncate text-xs font-mono uppercase rounded-full text-left text-gray-900  bg-gray-200 px-2 py-0.5">{profile.id}</span>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900 dark:text-white">{data?.name}</h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200 dark:border-gray-200/50">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {profileTabs.map((tab, index) => {
                          if (user.id !== profile.id && index === 1) return;
                          return (
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
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Description list */}
                <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
                  {currentTab === profileTabs[0].name && <Profile profile={profile}/>}
                  {currentTab === profileTabs[1].name && <Settings profile={profile} />}
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

export async function getServerSideProps(context) {
  const { req } = context;
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  if (!res1.ok || res1.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const newQueryString = req.headers.cookie.replace(/;/g, '&');
  const cookies = new URLSearchParams(newQueryString);
  const token = cookies.get('api-auth');
  const decoded = jwt.decode(token);

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/${context.params.id}`, {
    method: 'GET',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err) => console.error(err));

  if (!res2.ok || res2.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const profile = await res2.json();

  return {
    props: {
      profile: profile.data,
      user: {
        id: decoded.id,
        username: decoded.username,
        token,
      },
    },
  };
}
