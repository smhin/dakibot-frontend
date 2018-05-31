let PROJECT_ID = localStorage.getItem('PROJECT_ID');

export default {
  items: [
    {
      name: 'Home',
      url: '/project/' + PROJECT_ID,
      icon: 'cui-home'
    },
    {
      title: true,
      name: 'Configure & Train'
    },
    {
      name: 'Intents',
      url: '/project/' + PROJECT_ID + '/intents',
      icon: 'cui-layers',
    },
    {
      name: 'Training',
      url: '/dashboard',
      icon: 'cui-speech',
    },
    {
      title: true,
      name: 'Analyze'
    },
    {
      name: 'Analytics',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Manage'
    },
    {
      name: 'Bot Users',
      url: '/dashboard',
      icon: 'icon-people',
    },
    {
      name: 'Logout',
      icon: 'fa fa-sign-out',
      class: 'mt-auto',
      variant: 'danger',
    },
  ],
};
