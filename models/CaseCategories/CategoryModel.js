const {Schema, model} = require('mongoose');


const CategorySchema = Schema({

    category:{
        type:String,
        required:true,
        unique: true 
    }

});

CategorySchema.method('toJSON', function(){

    const{__v,_id,...object} =this.toObject();
    object.id = _id;
    return object;

});

module.exports = model('Category', CategorySchema);