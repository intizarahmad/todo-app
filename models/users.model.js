const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    email:{
        type : String, 
        trim: true, 
        minLength : 1, 
        required : true, 
        unique: true, 
        validate : {
            validator : validator.isEmail, 
            message : '{VALUE} is not a valid email'
        }
    }, 
    password :{
        type: String, 
        minLength: 6, 
        required: true
    }, 
    tokens :[
        {
            access : {
                type : String, 
                require: true
            }, 
            token :{
                type : String, 
                require: true
            }
        }
    ]
})
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
} 
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access ='auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc').toString();
   
    var a= [{access, token}];
    user.tokens = user.tokens.concat(a);
    
    return user.save().then(()=>{
        return token;
    })
}

UserSchema.statics.findByToken = function(token){
    let UserModel = this;
    let decoded; 
    try{
        decoded =  jwt.verify(token, 'abc')
    }catch(e){
        console.log("e",e);
        return Promise.reject();
    }

    console.log('decoded', decoded);
    return UserModel.findOne({
        '_id': decoded._id,
        'tokens.token' : token, 
        'tokens.access' : 'auth'
    });
}

UserSchema.pre('save', function(next){
    console.log('INSIDE PRE')
    let user = this; 
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});
const UserModel = mongoose.model('User', UserSchema);
module.exports = {UserModel}