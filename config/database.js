const parse = require('pg-connection-string').parse;
const connectionString = "postgres://abarabjeuqhfff:c8ab6b1ac57882d97b9c45f1db560048a51a7036c1826725b9e8dadfafa33f47@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/d1h55hnmj6ukbr"
const config = parse(process.env.DATABASE_URL ?? connectionString);
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
