const clientModel = require('./clientModel');
module.exports = {
    create: async (data)=>{
        const x = new clientModel(data);
        return x.save();
    },
    getAll: async ()=>{
        return  await clientModel.find();
    },
    getOne: async (id)=>{
        return await clientModel.findById(id);
    },
    updateOne: async(id, body)=>{
        return await clientModel.findByIdAndUpdate(id, body, { new : true});
        
    },
    deleteOne: async (id)=>{
        return await clientModel.deleteOne({_id: id})
    }
}