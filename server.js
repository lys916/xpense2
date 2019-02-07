const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
// const userRouter = require('./user/UserRoutes');
// const transactionRouter = require('./transaction/transactionRoutes');
// const eventRouter = require('./event/eventRoutes');

const server = express();

server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

mongoose
  .connect
  ('mongodb://lys:lys916@ds135233.mlab.com:35233/xpense')
  .then(conn => {
    console.log('connected to mongo xpense');
  })
  .catch(err => {
    console.log('error connect to mongo');
});

// server.use('/user', userRouter);
// server.use('/transaction', transactionRouter);
// server.use('/event', eventRouter);

// serve static assets if we're in production
if(process.env.NODE_ENV === 'production'){
  // set static folder
  server.use(express.static('client/build'));

  // any request that we get, load the index html static file
  server.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`); 
});
