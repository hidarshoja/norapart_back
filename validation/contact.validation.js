import {body} from "express-validator";

//! Define the allowed fields
const allowedFields = ["name", "body",  "email"];
const allowedFieldsReply = ["reply"];

export const addContactValidation = [
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

    body("username")
        .trim()
        .optional()
        .isString().withMessage("نام باید از نوع رشته باشد"),

    body("body")
        .trim()
        .notEmpty().withMessage("توضیحات نمی‌تواند خالی باشد")
        .isString().withMessage("توضیحات باید از نوع رشته باشد"),

    body("email")
        .trim()
        .isEmail().withMessage("لطفا فرمت ایمیل را به درستی وارد کنید"),
];

export const replyContactValidation = [
    (req, res, next) => {
        // Check for unknown fields
        const unknownFields = Object.keys(req.body).filter(
            (key) => !allowedFieldsReply.includes(key)
        );

        if (unknownFields.length > 0) {
            return res.status(400).json({
                message: `فیلدی نامعتبر: ${unknownFields.join(", ")}`,
            });
        }

        next(); // Proceed to field-specific validations
    },

    body("reply")
        .trim()
        .notEmpty().withMessage("جواب نمی‌تواند خالی باشد")
        .isString().withMessage("جواب باید از نوع رشته باشد"),


];