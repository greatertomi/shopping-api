import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema';

import connectDB from './config/mongodb';
connectDB();

const app = express();
const PORT = 5000;
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP((req: any, res: any, params: any) => ({
    schema,
    graphiql: true,
    context: { user: req.user },
  }))
);

app.get('/test', (req, res) => {
  res.send('welcome to this index now');
});

app.listen(PORT, (): void => {
  console.log(`Server Running here on port ${PORT}`);
});
