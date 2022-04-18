import candidateResolver from './candidate-resolver';
import jobsResolver from './jobs-resolver';

const resolvers = {
  Query: {
    candidate: candidateResolver,
    jobs: jobsResolver,
  },
};

export default resolvers;
