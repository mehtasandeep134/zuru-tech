import Contact from 'pages/Contact';
import { PAGE } from 'utils/enum';

export const routesData = [
  {
    path: PAGE.HOME,
    exact: true,
    component: Contact,
  },
  {
    path: PAGE.CHAT,
    exact: true,
    component: Contact,
  },
  {
    path: PAGE.CONTACTS,
    exact: true,
    component: Contact,
  },
];
