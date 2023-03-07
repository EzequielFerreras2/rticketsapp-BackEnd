const {Schema, model} = require('mongoose');


const UserSchema = Schema({

    name:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required:true,
        unique:true
    },

    
    password:{
        type: String,
        required:true,  
    },

    rol:{
        type: String,
        required:true, 
    },
    
    departament:{
        type: String,
        required:true, 
    },


    company:{
        type: String,
        required:true,  
    },
    status:{
        type: String,
        required:true,  
    }

});

UserSchema.method('toJSON', function(){

    const{__v,_id,...object} =this.toObject();
    object.id=_id;
    return object;
    
});

module.exports = model('User', UserSchema);
