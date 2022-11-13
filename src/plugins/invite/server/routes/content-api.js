module.exports = {
  type: 'content-api',
  routes: [
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
  ]
};
