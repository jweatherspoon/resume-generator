import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Name {
    first: String
    last: String
  }

  type Candidate {
    name: Name
  }

  type Job {
    organization: String
    title: String
    description: String
  }

  type Query {
    candidate: Candidate
    jobs: [Job]
  }
`;
