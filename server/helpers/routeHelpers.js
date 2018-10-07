const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
        const result = Joi.validate({ param: req['params'][name] }, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (!req.value)
                req.value = {};

            if (!req.value['params'])
                req.value['params'] = {};

            req.value['params'][name] = result.value.param;
            next();
        }
    }
  },

    validateBody: (schema) => {
      return (req, res, next) => {
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (!req.value)
                req.value = {};

            if (!req.value['body'])
                req.value['body'] = {};

            req.value['body'] = result.value;
            next();
        }
      }
    },

  schemas: {
      userSchema: Joi.object().keys ({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),

      }),

      userOptionalSchema: Joi.object().keys ({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email()
      }),

      userPostSchema: Joi.object().keys ({
        message: Joi.string().required()
      }),

      postSchema: Joi.object().keys ({
          subject: Joi.string().required(),
          message: Joi.string().required(),
          author: Joi.string().min(4).max(24).required()
      }),

      putPostSchema: Joi.object().keys ({
          subject: Joi.string().required(),
          message: Joi.string().required(),
      }),

      patchPostSchema: Joi.object().keys ({
          subject: Joi.string(),
          message: Joi.string(),
      }),

      idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

      authSchema: Joi.object().keys({
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string().email().required(),
          password: Joi.string().required()
      }),

      productSchema: Joi.object().keys({
          name: Joi.string().required(),
      }),

      putProductSchema: Joi.object().keys ({
          name: Joi.string().required(),
      }),

      patchProductSchema: Joi.object().keys ({
          name: Joi.string(),
      }),

  }
};