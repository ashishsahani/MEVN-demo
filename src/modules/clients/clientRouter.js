const router = require("express").Router();
const clientController = require('./clientController');

router.route('/').get(clientController.getAll).post(clientController.create);
router.route('/:id')
    .get(clientController.getOne)
    .patch(clientController.updateOne)
    .delete(clientController.deleteOne);
module.exports = router