import Contact from 'pages/Contact';
import { PAGE } from 'utils/enum';
import ContactDetails from 'containers/Table';

export const routesData = [
  {
    path: PAGE.HOME,
    exact: true,
    component: ContactDetails,
  },
  {
    path: PAGE.CHAT,
    exact: true,
    component: Contact,
  },
  {
    path: PAGE.CONTACTS,
    exact: true,
    component: ContactDetails,
  },
];
