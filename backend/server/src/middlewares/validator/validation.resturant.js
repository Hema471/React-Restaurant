const { check, validationResult } = require('express-validator');
const validateResturantInput = [
    check('ResName')
        .not().isEmpty().withMessage('Restaurant name is required')
        .isLength({ min: 2 }).withMessage('Restaurant name must be at least 2 characters long'),

    check('ResImg')
        .notEmpty().withMessage('Restaurant image URL is required')
        .custom((value, { req }) => {
            const allowedMimetypes = ['jpeg', 'png', 'gif', 'jpg'];
            if (!value.match(/\.(jpeg|jpg|gif|png)$/)) {
                throw new Error('Invalid image format');
            }
            return true;
        }),

    check('Categoery')
        .notEmpty().withMessage('Restaurant category is required')
];

module.exports=validateResturantInput