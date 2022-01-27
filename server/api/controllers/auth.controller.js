import { validateEmail, getCurrentTimestamp } from "../helpers/utils.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken"
import { getUserByUsername } from "../services/user.service.js";

export async function createUser(req, res) {
  const { username, password, firstName, lastName, email } = req.body;

  if (!username) {
    return res.status(400).send({ message: "Missing username" });
  }
  if (!password) {
    return res.status(400).send({ message: "Missing password" });
  }

  const salt = 10;
  //should use async/await function here
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = await getUserByUsername(username);

  if (user?.username) {
    return res.status(400).send({ message: "Username already exists" });
  } 
  else {
      if (!firstName) {
        return res.status(400).send({ message: "Missing first name" });
      } else if (!lastName) {
        return res.status(400).send({ message: "Missing last name" });
      } else if (!email) {
        return res.status(400).send({ message: "Missing email" });
      } else if (!validateEmail(email)) {
        return res.status(400).send({ message: "Enter a valid email address" });
      } else {
        const user_id = uuidv4()

        const user = {
          user_id: user_id,
          username: username,
          password: hashedPassword,
          email: email,
          firstName: firstName,
          lastName: lastName,
          created_at: getCurrentTimestamp()
        }

        const response = await insertUser(user)
        if (response) {
          const accessToken = jwt.sign(
            { username: username },
            process.env.JWT_SECRET
          );
          return res.send({accessToken: accessToken, user});
        }
        else {
          return res.status(500).send({ message: "An error has occured" });
        }
      }
    }
  }

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Missing username/password" });
  }
  const user = await getUserByUsername(username);

  if (!user?.username) {
    return res.status(404).send({ message: "User does not exist" });
  } else {
    bcrypt.compare(password, user.password, (error, response) => {
      if (response) {
        const accessToken = jwt.sign(
          { username: username },
          process.env.JWT_SECRET
        );
        return res.send({accessToken: accessToken, user });
      } else {
        return res.status(400).send({ message: "Incorrect password" });
      }
    });
  }
}