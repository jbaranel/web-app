import knex from "knex"

export async function connection () {
  const database =  knex({
    client: 'mysql2',
    connection: {
      host : process.env.DB_URI,
      port : 3306,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
  });
  return database
}