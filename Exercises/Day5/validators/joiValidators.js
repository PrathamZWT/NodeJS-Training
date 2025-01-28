import Joi from 'joi';

export const createUserProfileSchema = Joi.object({
    userId: Joi.number().required() ,
    bio: Joi.string().required(),
    linkedInUrl: Joi.string().uri().required(),
    facebookUrl :Joi.string().uri().required() ,
    instaUrl : Joi.string().uri().required(),
});
export const createUserProfileUpdateSchema = Joi.object({
    bio: Joi.string().required(),
    linkedInUrl: Joi.string().uri().required(),
    facebookUrl :Joi.string().uri().required() ,
    instaUrl : Joi.string().uri().required(),
});

const updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(18).optional(),
    role: Joi.string().valid('Admin','User').optional(),
    isActive: Joi.boolean().valid(true,false).optional(),
});

const userIdSchema = Joi.object({
    id: Joi.number().required(),
});

const querySchema = Joi.object({
    role: Joi.string().valid('Admin','User').optional(),
    isActive: Joi.string().valid('true','false').optional(),
    age: Joi.string().optional(),
})
// console.log('Joi:-----',Joi)
