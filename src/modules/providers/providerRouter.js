const router = require("express").Router();
const controller = require('./providerController');

router.route('/').get(controller.getAll).post(controller.create)
module.exports = router