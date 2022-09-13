import client from "../../client";
import { protectResolver } from "../users.util";

export default {
  Mutation: {
    followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist. ",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          followings: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
