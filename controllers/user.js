const Model = require('../models');
const utils = require('../utils');

module.exports = utils.wrappers({
  getUsers: async (req, res) => {
    return Model.getAll('users')
  },
  getUser: async (req, res) => {
    if (!req.params.id) {
      throw { message: 'ID is required.' }
    }

    const user = await Model.getById('users', req.params.id);

    if (!user)
      throw { clientError: true, message: 'User Not Found.' }


    return user;
  },
  createUser: async (req, res) => {
    if (!req.body) {
      throw { message: 'Body is required.' }
    }

    const { generated_keys: [id = ''] } = await Model.create('users', req.body);

    if (!id)
      throw { message: 'Something went wrong.' }

    return Model.getById('users', id);
  },
  deleteUser: async (req, res) => {
    const user = await Model.getById('users', req.params.id);

    if (!user)
      throw { clientError: true, message: 'User Not Found.' }

    const { deleted } = await Model.deleteById('users', req.params.id);
    return {
      deleted: !!deleted,
      data: user
    }
  },
  updateUser: async (req, res) => {
    const user = await Model.getById('users', req.params.id);

    if (!user)
      throw { clientError: true, message: 'User Not Found.' }

    const { replaced } = await Model.updateById('users', req.params.id, req.body);

    return {
      updated: !!replaced,
      data: await Model.getById('users', req.params.id)
    }
  },
})