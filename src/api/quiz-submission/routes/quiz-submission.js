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
    {
      method: 'GET',
      path: '/quiz-full/:id',
      handler: 'quiz-submission.getQuiz',
      config: {
        policies: [],
        middlewares: [],
      },
    }, {
      method: 'GET',
      path: '/history',
      handler: 'quiz-submission.myHistory',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
