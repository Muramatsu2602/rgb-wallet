const mongoose = require('mongoose');


/*BENETI's */
const uri = "mongodb+srv://vitorbeneti:powerguido1234594@rgbwallet.dgsze.mongodb.net/rgbwallet?retryWrites=true&w=majority";

/*KENZO's */
// const uri = 'mongodb+srv://Muramatsu2602:<password>@rgbwallet-cluster.wbt6z.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});