const { celebrate, Joi } = require('celebrate');

const createValidator = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        publication_year: Joi.number().min(1900).required(),
        num_of_pages: Joi.number().required()
    }),
});

const updateValidator = celebrate({
    body: Joi.object().keys({
        publication_year: Joi.number().min(1900).required(),
        num_of_pages: Joi.number().required()
    }),
});

const borrowBookValidator = celebrate({
    body: Joi.object().keys({
        borrower_name: Joi.string().min(3).required(),
    }),
    params: Joi.object().keys({
        bookId: Joi.string().min(7).required()
    })
});

const getBookValidator = celebrate({
    params: Joi.object().keys({
        bookId: Joi.string().min(3).required()
    })
});

const getAllBooksValidator = celebrate({
    query: Joi.object().keys({
        author: Joi.string().min(3),
        name: Joi.string().min(3),
        available: Joi.boolean()
    }),
});

const returnBookValidator = celebrate({
    params: Joi.object().keys({
        bookId: Joi.string().required()
    }),
});

module.exports = {
    createValidator,
    updateValidator,
    getBookValidator,
    getAllBooksValidator,
    borrowBookValidator,
    returnBookValidator
};