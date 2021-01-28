import mongoose from "mongoose";

// const uri = "mongodb+srv://vitorbeneti:powerguido1234594@rgbwallet.dgsze.mongodb.net/rgbwallet?retryWrites=true&w=majority";
const uri = "mongodb/kenzoooo";


mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,

});
