const {Schema, model} = require('mongoose');


const CasesCategorySchema = Schema({

    title:{
        type:String,
        required:true
    },
    subcategory:{
        type: Schema.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }


  
});

CasesCategorySchema.method('toJSON', function(){

    const{__v,_id,...object} =this.toObject();
    object.id = _id;
    return object;

});

module.exports = model('CasesCategory', CasesCategorySchema);