const mongoose = require('mongoose');


/*BENETI's */
const uri = `mongodb+srv://vitorbeneti:${process.env.REACT_APP_MONGODB_URI}@rgbwallet.dgsze.mongodb.net/rgbwallet?retryWrites=true&w=majority`;

/*KENZO's */
// const uri = `mongodb+srv://Muramatsu2602:${process.env.REACT_APP_MONGODB_URI}@rgbwallet-cluster.wbt6z.mongodb.net/rgbwallet-cluster?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});