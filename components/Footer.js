const navigation = {
  main: [
    { name: 'Sitemap', href: '/sitemap' },
    { name: 'Status', href: 'https://reign.betteruptime.com/' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Term of use', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white z-50">
      <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} <a href="https://github.com/UNIZAR-30226-2023-01" target="_blank" referrerPolicy="no-referrer" rel="noreferrer">Grace Hopper</a>, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
