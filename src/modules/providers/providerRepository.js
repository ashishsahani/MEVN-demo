const model = require('./providerModel');
module.exports = {
    create: async (data)=>{
        const x = new model(data);
        return await x.save();
    },
    getAll: async ()=>{
        return  await model.find();
    },
    getByIds: async (ids=[])=>{
        return await model.find({_id : {$in : ids}});
    }
}