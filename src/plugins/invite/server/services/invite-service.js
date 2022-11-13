'use strict';

const _ = require("lodash");
const {QUIZ_SIZE} = require("../utils/constants");


function getIntersectedSkill(user1, user2) {
  const skillIdsSet1 = user1.skills.map(s => s.id);
  const skillIdsSet2 = user2.skills.map(s => s.id);

  return _.sample(_.intersection(skillIdsSet1, skillIdsSet2));
}

async function getQuizQuestionsBySkill(skill) {
  const questions = strapi.db.query('api::question.question')
    .findMany({
      where: {
        skill: skill.id
      },
      populate: {
        answers: true
      }
    });

  return questions.slice(0, QUIZ_SIZE);
}

module.exports = ({ strapi }) => ({
  async createInvite(ctx) {
    const invitedUser = await strapi.db.query('api::quiz.quiz')
      .findOne({
        where: {
          id: ctx.request.body.userId
        },
        populate: {
          skills: true
        }
      });

    if (!invitedUser) {
      ctx.send({message: 'User not found'}, 404)
    }

    const currentUser = await strapi.db.query('api::quiz.quiz')
      .findOne({
        where: {
          id: ctx.state.user.id
        },
        populate: {
          skills: true
        }
      });

    const skill = await getIntersectedSkill(invitedUser, currentUser);
    const questions = await getQuizQuestionsBySkill(skill);

    const quizBody = {
      users: [ctx.state.user.id, invitedUser.id],
      questions: [questions.map(q => q.id)]
    }

    const quiz = await strapi.service('api::quiz.quiz').create({data: quizBody});

    return quiz;
  },

  async getMyInvites(ctx) {
    const existingQuizzes = await strapi.db.query('api::quiz.quiz')
        .findMany({
          where: {
            'users.id': ctx.state.user.id,
            isFinished: false
          },
          populate: {
            users_permissions_users: true,
          }
        });

    return existingQuizzes;
  }
});
