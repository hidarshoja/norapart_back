import {body} from "express-validator";
const allowedFields = ["name", "description"];

export const questionVaalidtion = [
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
    body("name")
        .trim()
        .notEmpty()
        .withMessage("موضوع سوال  را وارد کنید")
        .isString()
        .withMessage("موضوع سوال را به فارسی وارد کنید"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("جواب سوال  را وارد کنید.")
        .isString()
        .withMessage("موضوع سوال به صورت فارسی است"),
];


export const questionVaalidtionUpdate = [
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
    body("name")
        .trim()
        .optional()
        .notEmpty()
        .withMessage("موضوع سوال  را وارد کنید")
        .isString()
        .withMessage("موضوع سوال را به فارسی وارد کنید"),

    body("description")
        .trim()
        .optional()
        .notEmpty()
        .withMessage("جواب سوال  را وارد کنید.")
        .isString()
        .withMessage("موضوع سوال به صورت فارسی است"),
];