'use strict';

module.exports = ({ strapi }) => ({
  async myInvites(ctx) {
    ctx.body = await strapi
      .plugin('invite')
      .service('inviteService')
      .getMyInvites(ctx);

  },
  async invite(ctx) {
    ctx.body = await strapi
      .plugin('invite')
      .service('inviteService')
      .createInvite(ctx);
  },
});
