import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

export default class Database {
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