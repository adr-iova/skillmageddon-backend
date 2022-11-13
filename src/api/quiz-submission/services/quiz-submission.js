'use strict';

/**
 * quiz-submission service
 */

function getTimeScore(question, answer) {
  if (answer.time <= question.time / 3) {
    return Math.floor(question.score / 2);
  }

  if (answer.time <= 2 * question.time / 3) {
    return Math.floor(question.score / 3);
  }

  return 0;
}


module.exports = ({ strapi }) => ({
  async createSubmission(ctx) {

    const submission = await strapi.db.query('api::submission.submission').create({
      data: {
        submissionDate: new Date(),
        quiz: ctx.request.body.quizId,
        user: ctx.state.user.id
      }
    });

    console.log("Submission", submission);

    const questionSubmissionBodies = [];
    let totalScore = 0;

    for (let i = 0; i < ctx.request.body.responses.length; ++i) {
      const response = ctx.request.body.responses[i];
      const question = await strapi.db.query('api:quiz.quiz').findOne({
        where: {
          id: response.questionId
        },
        populate: {
          answers: true
        }
      });


      if (!question) {
        return ctx.send({message: "Question not founds"}, 404);
      }

      const questionSubmissionBody = {
        answer: response.answer,
        question: question.id,
        submission: submission.id
      }

      const selectedAnswer = question.answers.find(a => a.text === response.answer);

      if (selectedAnswer && selectedAnswer.isCorrect) {
        const score = question.score + getTimeScore(question, selectedAnswer);
        questionSubmissionBody.score = score;
        totalScore += score;

      }
      questionSubmissionBodies.push(questionSubmissionBodies);
    }

    const submissionQuestionsEntries = await strapi.db.query('api::question-submission.question-submission').createMany({
      data: questionSubmissionBodies
    })

    console.log("created question submissions");

    await strapi.service('api::submission.submission').update(submission.id, {data: {
      ...submission,
        score: totalScore
      }});

    console.log("updated submission with score");

    const currentUser = await strapi.service('plugin::users-permissions.user').findOne(ctx.state.user.id);
    await strapi.service('plugin::users-permissions.user').update(ctx.state.user.id, {
      ...currentUser,
      score: currentUser.score + totalScore
    });

    console.log('updated current user', currentUser.score + totalScore);

    return submissionQuestionsEntries;

  },

  async quiz(ctx) {
    let fullQuiz = {
    }
    const quiz = await strapi.db.query('api::quiz.quiz').findOne({
      where: {
        id: ctx.params.id
      },
      populate: {
        questions: {
          populate: {
            answers: {
              select: ['text', 'id']
            },
          }
        }
      }
    });

    return quiz;
  }
});
