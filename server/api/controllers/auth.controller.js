import AWS from "aws-sdk";
import User from "../models/User.js";
import { validateEmail, stringToDate } from "../helpers/utils.js";
import bcrypt from "bcrypt";
import { getUser } from '../db.js'
import { v4 as uuidv4 } from "uuid";

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "users";

export async function createUser(req, res) {
  const { username, password, firstName, lastName, email } = req.body;

  if (!username) {
    return res.status(400).send({ message: "Missing username" });
  }
  if (!password) {
    return res.status(400).send({ message: "Missing password" });
  }

  const salt = 10;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      password = hash;
    }
  });

  let params = {
    Key: {
      username: username,
    },
    TableName: tableName,
  };

  await dynamodb
    .get(params)
    .promise()
    .then((response) => {
      const checkUsername = response.Item?.username;
      if (checkUsername == username) {
        return res.status(400).send({ message: "Username already exists" });
      } else {
        if (!firstName) {
          return res.status(400).send({ message: "Missing first name" });
        } else if (!lastName) {
          return res.status(400).send({ message: "Missing last name" });
        } else if (!email) {
          return res.status(400).send({ message: "Missing email" });
        } else if (!validateEmail(email)) {
          return res
            .status(400)
            .send({ message: "Enter a valid email address" });
        } else {
          let newUser = new User(
            username,
            password,
            firstName,
            lastName,
            email,
            Date.now()
          );

          let params = {
            TableName: tableName,
            Item: newUser,
          };

          dynamodb.put(params, (err, res) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "An error has occured" });
            } else {
              const accessToken = jwt.sign(
                { username: username },
                process.env.JWT_SECRET
              );
              return res.send({accessToken: accessToken, newUser});
            }
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ message: "An error has occured" });
    });
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Invalid request" });
  }
  const user = await getUser(username);

  if (!user?.username) {
    return res.status(400).send({ message: "User does not exist" });
  } else {
    bcrypt.compare(password, user.password, (error, response) => {
      if (response) {
        const accessToken = jwt.sign(
          { username: username },
          process.env.JWT_SECRET
        );
        return res.send({ accessToken: accessToken });
      } else {
        return res.status(400).send({ message: "Incorrect password" });
      }
    });
  }
}
