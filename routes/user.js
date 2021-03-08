const controller = require('../controllers/user');
const router = require('express').Router();

router
  .get('/', controller.getUsers)
  .get('/:id', controller.getUser)
  .post('/', controller.createUser)
  .put('/:id', controller.updateUser)
  .delete('/:id', controller.deleteUser)


module.exports = router;