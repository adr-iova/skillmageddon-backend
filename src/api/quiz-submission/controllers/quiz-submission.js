'use strict';

/**
 * A set of functions called "actions" for `quiz-submission`
 */

module.exports = ({ strapi }) => ({
  submitQuiz(ctx) {
    ctx.body = strapi
      .plugin('invite')
      .service('quizSubmissionService')
      .createSubmission(ctx);
  }
});
