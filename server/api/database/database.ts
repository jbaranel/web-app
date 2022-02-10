import { Knex } from "knex";
import knex from 'knex'

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const config: IKnexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_URI,
      port: 3306,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};

export default knex(config[process.env.ENVIRONMENT || "development"])

