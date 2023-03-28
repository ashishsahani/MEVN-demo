const clientService = require('./clientService');
const clientController = {
    getAll: async (req, res, next)=>{
        try {
            const clients = await clientService.getAll();
            res.status(200).send(clients)
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next)=>{
        try {
            const newClient = req.body;
            const client = await clientService.create(newClient);
            return res.status(200).send(client)
        } catch (error) {
            next(error)
        }
    },
    getOne: async(req, res, next)=>{
        try {
            const id = req.params.id;
            const entity = await clientService.getOne(id);
            // console.log(x);
            if (!entity){
                return res.status(404).send('Not Found');
            }
            return res.status(200).send(entity);
        } catch (error) {
            next(error)
        }
    },
    updateOne: async(req, res, next)=>{
        try {
            const id = req.params.id;
            
            const entity = await clientService.getOne(id);
            if (!entity){
                return res.status(404).send('Not Found');
            }
            const updateBody = await clientService.updateOne(id, req.body);
            return res.status(200).send(updateBody);
        } catch (error) {
            next(error)
        }
    },
    deleteOne: async(req, res, next)=>{
        try {
            const id = req.params.id;
            const entity = await clientService.getOne(id);
            if (!entity){
                return res.status(404).send('Not Found');
            }
            await clientService.deleteOne(id);
            return res.status(200).send("ok");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = clientController