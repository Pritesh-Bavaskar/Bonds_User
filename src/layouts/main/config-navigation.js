// routes
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Bonds Library',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.bondLibrary,
  },
  {
    title: 'Products',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        items: [
          { title: 'Corporate Bond', path: paths.about },
          { title: 'Government Bond', path: paths.contact },
          { title: 'Listed Bond', path: paths.faqs },
          { title: 'Unlisted Bond', path: paths.pricing },
        ],
      },
    ],
  },
  {
    title: 'Resources',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        items: [
          { title: 'Blogs', path: paths.post.root },
          { title: 'FAQs', path: paths.faqs },
          { title: 'News/Insight', path: paths.pricing },
          { title: 'Calculator', path: paths.payment },
          { title: 'Refer and Earn', path: paths.maintenance },
          { title: 'Issuers', path: paths.comingSoon },
        ],
      },
    ],
  },
  {
    title: 'About',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        // subheader: 'Other',
        items: [
          { title: 'About Company', path: paths.about },
          { title: 'Contact us', path: paths.contact },
        ],
      },
    ],
  },
];
