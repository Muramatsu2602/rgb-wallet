const mongoose = require('mongoose');

const uri = "CODIGO DO MONGO"
// const uri = "mongodb+srv://vitorbeneti:powerguido1234594@rgbwallet.dgsze.mongodb.net/rgbwallet?retryWrites=true&w=majority";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});