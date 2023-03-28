const clientRepository = require('./clientRepository');
const providerService = require("../providers/providerService");
const {EntityRelationError} = require("../../commons/error");

module.exports  = {
    getAll: async ()=> {
        return clientRepository.getAll()
    },
    create: async (newClient)=>{
        return clientRepository.create(newClient)
    },
    getOne: (id)=>{
        return clientRepository.getOne(id);
    },
    updateOne: async (id, body)=>{
        if (body.providers && body.providers.length> 0 ){
            const findIdsExists = await providerService.getByIds(body.providers.map(i=> i.id));
            if (findIdsExists.length < body.providers.length){
                throw new EntityRelationError({
                    message: "Provider id not Found",
                    providers: body.providers
                })
            }
            return await clientRepository.updateOne(id, body);
        }
    },
    deleteOne: (id)=>{
        return clientRepository.deleteOne(id);
    }
}