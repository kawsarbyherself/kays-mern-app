
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

//const CONNECTION_URL = 'mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test';
const PORT = process.env.PORT|| 5000;

const CONNECTION_URL = 'mongodb+srv://kawsarbyherself:Appleinc24@cluster0.5ragz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  // //mongoose.connect(
  //   CONNECTION_URL || "mongodb://localhost/kays",
  //   { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  // );
  // app.listen(PORT, function() {
  //   console.log(`🌎 ==> API server now on port ${PORT}!`);
  // });

//mongoose.set('useFindAndModify', false);

