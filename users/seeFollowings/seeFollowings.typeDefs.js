import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    followings: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult
  }
`;
