const service = require('./providerService');
module.exports = {
    getAll: async (req, res, next)=>{
        try {
            const providers = await service.getAll();
            res.status(200).send(providers)
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next)=>{
        try {
            const newProvider = req.body;
            const provider = await service.create(newProvider);
            return res.status(200).send(provider)
        } catch (error) {
            next(error)
        }
    }
}
