const utils = {
  wrapper: (fn) => {
    return async (req, res) => {
      try {
        const result = await fn(req, res);
        return res.send(result);
      } catch (e) {
        return res
          .status(e.clientError ? 400 : 500)
          .send({
            message: e.message
          });
      }
    }
  },
  wrappers: (handlers) => {
    return Object
      .keys(handlers)
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: utils.wrapper(handlers[key])
        };
      }, {})
  }
}

module.exports = utils;