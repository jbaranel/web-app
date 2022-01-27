import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
import { connection } from "../helpers/db_connector.js"

export class Database {
  constructor (tableName) {
    this.dynamodb = new AWS.DynamoDB.DocumentClient();
    this.tableName = tableName
  }

  async getItem(id) {
  
    let params = {
      Key: {
        id: id,
      },
      TableName: this.tableName,
    };
  
    const result = await this.dynamodb
      .get(params)
      .promise()
      .then((response) => {
        const item = response?.Item;
        if (item) {
          return item;
        }
        else {
          return
        }
      })
    return result
  }

  async getUser(username) {
  
    let params = {
      Key: {
        username: username,
      },
      TableName: this.tableName,
    };

    const result = await this.dynamodb
      .get(params)
      .promise()
      .then((response) => {
        const item = response?.Item;
        if (item) {
          return item;
        }
        else {
          return
        }
      })
    return result
  }

  removeFromDB(id) {
    let params = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };
    this.dynamodb.delete(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }

  putItem(params) {
    this.dynamodb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {        
      }
    });
  }
  updateUser(params) {
    this.dynamodb.update(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
      }
    });

  }
}

export function user ( ){}

export async function queryUser (username) {
  const database = await connection()
  let res;
  try {
    res = await database.select().from("User").where({ username: username })
  }
  catch (err) {
    console.log(err)
  }
  finally {
    database.destroy()
  }
  return res[0]
}

export async function insertUser (user) {
  const database = await connection()
  let res;
  try {
    res = await database('User').insert(user)
  }
  catch (err) {
    console.log(err)
  }
  finally {
    database.destroy()
  }
  return res
}