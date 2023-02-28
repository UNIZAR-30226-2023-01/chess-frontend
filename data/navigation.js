import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
  PlayIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

export const primaryButton = {
  name: 'Jugar partida',
  href: '/play',
  icon: PlayIcon,
  link: [
    {
      name: 'Contra la IA',
      href: '/ranking',
      icon: ArrowTopRightOnSquareIcon,
    }, {
      name: 'Competitiva',
      href: '/ranking',
      icon: ArrowTopRightOnSquareIcon,
    }, {
      name: 'Igualada',
      href: '/ranking',
      icon: ArrowTopRightOnSquareIcon,
    }, {
      name: 'Amistosa',
      href: '/ranking',
      icon: ArrowTopRightOnSquareIcon,
    },
  ],
};

export const navigation = [{
  name: 'Torneos',
  href: '/tournaments',
  icon: TrophyIcon,
}, {
  name: 'Clasificación',
  href: '/ranking',
  icon: ChartBarIcon,
}, {
  name: 'Analíticas',
  href: '/analytics',
  icon: ArrowTrendingUpIcon,
}];

export const subNavigation = [{
  name: 'Perfil',
  href: '/',
  icon: UserIcon,
}, { theme: true }, {
  name: 'Upgrades & FAQ',
  href: '/faq',
  icon: ArrowTopRightOnSquareIcon,
}, {
  name: 'Log out',
  icon: ArrowRightOnRectangleIcon,
  onClick: () => {},
}];
