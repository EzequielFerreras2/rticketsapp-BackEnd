const {Schema, model} = require('mongoose');


const SubCategorySchema = Schema({

    subcategory:{
        type:String,
        required:true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
  
});

SubCategorySchema.method('toJSON', function(){

    const{__v,_id,...object} =this.toObject();
    object.id = _id;
    return object;

});

module.exports = model('SubCategory', SubCategorySchema);