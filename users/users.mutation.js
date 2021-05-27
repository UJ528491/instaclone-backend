import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      //  check if username or email are already on DB.
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          console.log(existingUser);
          throw new Error("This username or password is already taken.");
        }
        //  hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    //  save and return the user
    login: async (_, { username, password }) => {
      //find user with args.username
      const user = await client.user.findFirst({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      //check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Invalid Password",
        };
      }
      //issue a token and send it
    },
  },
};
