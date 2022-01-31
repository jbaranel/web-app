import knex from "knex"
import config from "../../config"

export async function connection () {
  const database =  knex({
    client: 'mysql2',
    connection: {
      host : config.DB_URI,
      port : 3306,
      user : config.DB_USERNAME,
      password : config.DB_PASSWORD,
      database : config.DB_NAME
    }
  });
  return database
}