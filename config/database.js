module.exports = ({ env }) => {
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USER', 'strapi'),
        password: env('DATABASE_PASSWORD', '123456'),
        ssl:
          env('NODE_ENV') === 'development'
            ? false
            : {
              rejectUnauthorized: false,
            },
      },
    },
  }
}
