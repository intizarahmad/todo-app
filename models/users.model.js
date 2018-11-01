const mongoose = require('mongoose');
const UserModel = mongoose.model('User', {
    email:{
        type : String, 
        trim: true, 
        minLength : 1, 
        required : true
    }
});
module.exports = {UserModel}