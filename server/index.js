
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');

const postRoutes = require ('./routes/posts.js');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT|| 5000;

const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb+srv://kawsarbyherself:Appleinc24@cluster0.5ragz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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

