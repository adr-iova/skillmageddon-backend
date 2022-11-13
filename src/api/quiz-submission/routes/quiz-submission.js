module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/quiz-submission',
     handler: 'quiz-submission.submitQuiz',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
