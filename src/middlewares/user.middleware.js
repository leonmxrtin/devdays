import { body, validationResult } from 'express-validator';

const validateCreateUser = [
    // Validate 'name' field
    body('username')
        .exists({ checkNull: true })
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    
    // Validate 'email' field
    body('email')
        .exists({ checkNull: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid'),

    // Validate 'password' field
    body('password')
        .exists({ checkNull: true })
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string'),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export { validateCreateUser };