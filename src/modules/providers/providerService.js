const repository = require('./providerRepository');

const service = {
    getAll: async ()=> {
        return repository.getAll()
    },
    create: async (data)=>{
        return repository.create(data)
    },
    getByIds: async (ids=[])=>{
        return repository.getByIds(ids);
    }
}
module.exports = service