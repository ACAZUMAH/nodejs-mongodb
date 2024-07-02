"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidation = void 0;
exports.RegisterValidation = {
    username: {
        notEmpty: {
            errorMessage: 'username required'
        },
        isString: {
            errorMessage: 'username must be a string'
        },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: 'username must be between 5 and 20 characters'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'email required'
        },
        isEmail: {
            errorMessage: 'invalid email'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password required'
        },
        isLength: {
            options: {
                min: 6,
                max: 16
            },
            errorMessage: 'password must be between 6 and 16 characters'
        }
    }
};
