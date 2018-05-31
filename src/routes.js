import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Project = Loadable({
  loader: () => import('./views/Project/Project'),
  loading: Loading,
});

const Intents = Loadable({
  loader: () => import('./views/Intents/Intents'),
  loading: Loading,
});


const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/project/:projectId', exact: true, name: 'Project', component: Project },
  { path: '/project/:projectId/intents', name: 'Intents', component: Intents },
];

export default routes;
