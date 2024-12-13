import Joi from 'joi';

// Custom validation function to reject script tags
const noScriptTags = (value, helpers) => {
    const scriptTagPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (scriptTagPattern.test(value)) {
      return helpers.message(`"${helpers.state.path.join('.')}": XSS not allowed`);
    }
    return value;
  };

export const signupSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required().custom(noScriptTags),
  fullname: Joi.string().min(3).max(20).required().custom(noScriptTags),
  username: Joi.string().min(3).max(20).required().custom(noScriptTags),
  universityregistrationnumber: Joi.string().max(20).custom(noScriptTags),
  university: Joi.string().required().custom(noScriptTags)
  
});

export const signinSchema = Joi.object({
  emailOrUsername: Joi.string().required().custom(noScriptTags),
  password: Joi.string().required().custom(noScriptTags)
});