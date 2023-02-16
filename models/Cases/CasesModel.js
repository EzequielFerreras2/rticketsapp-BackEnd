const {Schema, model} = require('mongoose');


const CasesSchema = Schema({

    casesCategory:{
        type: Schema.Types.ObjectId,
        ref:'CasesCategory',
        required:true
    },
    openCaseUser:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type: String,
        required:true,
       
    },

    details:{
        type: String, 
        required:true,
    },
    notesSuport:{
        type: String, 
    },

    openDate:{
        type: String,
        required:true, 
    },
    
    closeDate:{
        type: String, 
    },

    closeCaseUser:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },

});

CasesSchema.method('toJSON', function(){

    const{__v,_id,...object} =this.toObject();
    object.id=_id;
    return object;
    
});

module.exports = model('Cases', CasesSchema);