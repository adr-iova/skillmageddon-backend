'use strict';

/**
 * A set of functions called "actions" for `quiz-submission`
 */

module.exports = ({ strapi }) => ({
  async submitQuiz(ctx) {
    ctx.body = await strapi
      .service('api::quiz-submission.quiz-submission')
      .createSubmission(ctx);
  },
  async getQuiz(ctx) {
    console.log()
    console.log()
    ctx.body = await strapi
      .service('api::quiz-submission.quiz-submission')
      .quiz(ctx);
  },
  async myHistory(ctx) {
    console.log()
    console.log()
    ctx.body = await strapi
      .service('api::quiz-submission.quiz-submission')
      .history(ctx);
  }
});
