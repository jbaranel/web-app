import knex from "knex"

export const database = knex({
    client: 'mysql2',
    connection: {
      host : process.env.DB_URI,
      port : 3306,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
  });


const f = async () => {
    const user = {
        user_id: "2c70498b-9fe1l4d17-a992-5e32649cda79",
        username: "123p4",
        password: "$2b$10$G/heihdXmKlKBXTKheyYsuq02fOlHQq8RSa/aCX6jNDWJWLS5uOaa",
        lastName: "Baranello",
        email:"Taraklb@optonline.net",
        firstName:  "Tara"
        }
    const res = await database('User').insert(user)
    console.log(res)
    database.destroy()
}

const g = async () => {
    const res = await database.select().from("User").where({ username: '1234' })
    console.log(res)
    database.destroy()
}

