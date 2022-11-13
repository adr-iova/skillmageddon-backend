'use strict';

/**
 * quiz-submission service
 */

function getTimeScore(question, answer) {
  if (answer.time <= question.allowedTime / 3) {
    return Math.floor(question.Score / 2);
  }

  if (answer.time <= 2 * question.allowedTime / 3) {
    return Math.floor(question.Score / 3);
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

    const questionSubmissionBodies = [];
    let totalScore = 0;

    for (let i = 0; i < ctx.request.body.responses.length; ++i) {
      const response = ctx.request.body.responses[i];
      const question = await strapi.db.query('api::question.question').findOne({
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
        submission: submission.id,
        score: 0
      }

      const selectedAnswer = question.answers.find(a => a.text === response.answer);

      if (selectedAnswer && selectedAnswer.isCorrect) {
        const score = question.Score + getTimeScore(question, response);
        questionSubmissionBody.score = score;
        totalScore += score;

      }
      questionSubmissionBodies.push(questionSubmissionBody);
    }

    const submissionQuestionsEntries = await strapi.db.query('api::submission-question.submission-question').createMany({
      data: questionSubmissionBodies
    })

    console.log("created question submissions");

    await strapi.service('api::submission.submission').update(submission.id, {data: {
      ...submission,
        score: totalScore
      }});

    console.log("updated submission with score");

    const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne(ctx.state.user.id);

    await strapi.db.query('plugin::users-permissions.user').update( {
      where: {
        id: ctx.state.user.id,
      },
      data: {
        totalScore: currentUser.totalScore + totalScore
      }
    });

    console.log('updated current user', (currentUser.score || 0) + totalScore);

    return {
      totalScore,
      questionSubmissions: questionSubmissionBodies
    };

  },

  async quiz(ctx) {
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
        },
        users: true
      }
    });

    return quiz;
  },

  async history(ctx) {
    const quizzes = await strapi.db.query('api::quiz.quiz').findMany({
      where: {
        users: {
          id: 26
          // id: ctx.state.user.id
        }
      },
      populate: {
        users: true,
        submissions: {
          populate: {
            user: true,
          }
        }
      }
    });

    return quizzes.map(q => {
      let quiz = {...q};
      if (q.submissions.length === 2) {
        console.log(q.submissions[0].score, q.submissions[1].score)
        if (q.submissions[0].score > q.submissions[1].score) {
          quiz.winner = q.submissions[0].user;
        } else if (q.submissions[0].score < q.submissions[1].score) {
          console.log(q.submissions[1].user);
          quiz.winner = q.submissions[1].user;
        } else {
          quiz.winner = 'draw';
        }
      } else {
        quiz.winner = null;
      }

      return quiz;
    })
  }
});
