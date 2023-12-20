import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => { 
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();

        res.status(422).json({message: "Validation failed", errors: errors.array()});
    }
}

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").trim().isLength({min: 5}).notEmpty().withMessage("Password is required"),
];

const loginValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").trim().isLength({min: 5}).notEmpty().withMessage("Password is required"),
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
];
  

export { validate, signupValidator, loginValidator };