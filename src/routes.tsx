import { RouteConfig } from 'react-router-config';
import Layout from 'layout';
import { routesData } from 'utils/routesData';

const routes: RouteConfig[any] = [
  {
    component: Layout,
    routes: routesData,
  },
];
export default routes;
