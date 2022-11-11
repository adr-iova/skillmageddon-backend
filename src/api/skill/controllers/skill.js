'use strict';

/**
 * skill controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::skill.skill', ({strapi}) => ({
  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    console.log(results, pagination);
    return { results, pagination };
  },
}));
