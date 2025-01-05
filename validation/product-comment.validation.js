import {body} from "express-validator";
const allowedFields = [ "body","product_id","user_id","rate"];

export const productCommentValidation = [
    (req, res, next) => {
        // Check for unknown fields
        const unknownFields = Object.keys(req.body).filter(
            (key) => !allowedFields.includes(key)
        );

        if (unknownFields.length > 0) {
            return res.status(400).json({
                message: `فیلدی نامعتبر: ${unknownFields.join(", ")}`,
            });
        }

        next(); // Proceed to field-specific validations
    },

    body("body")
        .trim()
        .notEmpty()
        .withMessage("توضیحات کامنت  را وارد کنید.")
        .isString()
        .withMessage("توضیحات کامنت به صورت فارسی است"),
];

