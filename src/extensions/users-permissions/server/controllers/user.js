module.exports = {
  /**
   * Retrieve user records.
   * @return {Object|Array}
   */
  async find(ctx, next, { populate } = {}) {
    let users;
    console.log("Ajung aici")
    ctx.set(
      "Content-Range",
      await strapi.query("user", "users-permissions").count({})
    );
    if (_.has(ctx.query, "_q")) {
      // use core strapi query to search for users
      users = await strapi
        .query("user", "users-permissions")
        .search(ctx.query, populate);
    } else {
      users = await strapi.plugins["users-permissions"].services.user.fetchAll(
        ctx.query,
        populate
      );
    }

    ctx.send(data);
  }
};
