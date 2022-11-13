module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/quiz-submission',
     handler: 'quiz-submission.submitQuiz',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
