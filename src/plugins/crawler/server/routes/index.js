module.exports = [
  {
    method: 'GET',
    path: '/start/:toptalIdentifier',
    handler: 'myController.start',
    config: {
      policies: [],
    },
  },
];
