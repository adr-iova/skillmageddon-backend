module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.myInvites',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: 'myController.invite',
    config: {
      policies: [],
    },
  },
];
