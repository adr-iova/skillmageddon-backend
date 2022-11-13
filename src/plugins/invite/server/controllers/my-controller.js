'use strict';

module.exports = ({ strapi }) => ({
  myInvites(ctx) {
    ctx.body = strapi
      .plugin('invite')
      .service('inviteService')
      .getMyInvites(ctx);
  },
  invite(ctx) {
    // console.log(ctx);
    ctx.body = strapi
      .plugin('invite')
      .service('inviteService')
      .createInvite(ctx);
  },
});
