const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const postRoutes = require('./controller/post.controller');
const userRoutes = require('./controller/user.controller');
const commentRoutes = require('./controller/comment.controller');

const cors = require('cors')
const cookieParser = require('cookie-parser');

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => console.log('Database Connected'))

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.listen(process.env.BACKEND_PORT || 4000, () => {
    console.log('Server is up and running');
  });