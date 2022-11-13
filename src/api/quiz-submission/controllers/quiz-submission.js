'use strict';

/**
 * A set of functions called "actions" for `quiz-submission`
 */

module.exports = ({ strapi }) => ({
  async submitQuiz(ctx) {
    ctx.body = await strapi
      .plugin('invite')
      .service('quizSubmissionService')
      .createSubmission(ctx);
  }
});
