const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('',{ useNewUrlParser: true });
const dbstring = process.env.MLAB_MONGO_KEYS ||'mongodb://localhost:27017/TodoApp';
mongoose.connect(dbstring,{ useNewUrlParser: true });

module.exports = {
    mongoose
}