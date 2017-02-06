import { makeExecutableSchema } from 'graphql-tools';


// currently gql tag is implemented as noop. The reason why I do this is I can 
// get syntax highlighting using Kumar Harsh's GraphQL for VSCode syntax highlighting extension.
// If anybody has a better idea, pls let me know.
const gql = x => x;

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
  }
  type Query {
    users: [User]
  }
  schema {
    query: Query
  }
`;

const resolvers = {
  Query: {
    users(root, args, context) {
      // to run a query we can acquire a client from the pool,
      // run a query on the client, and then return the client to the pool
      context.pool.connect((err, client, done) => {
        if (err) {
          return console.error('error fetching client from pool', err);
        }
        client.query('SELECT $1::int AS number', ['1'], (err2, result) => {
          // call `done()` to release the client back to the pool
          done();

          if (err2) {
            return console.error('error running query', err2);
          }
          console.log(result.rows[0].number);
          // output: 1
        });
      });

      return [{
        id: 1,
        firstName: 'Ben',
        lastName: 'Kinsey!'
      }];
    }
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
