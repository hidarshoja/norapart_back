import {body} from "express-validator";

//! Define the allowed fields
const allowedFields = ["title", "description",  "expired_at"];

export const addNotificationValidation = [
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

    body("title")
        .trim()
        .notEmpty().withMessage("عنوان نمی‌تواند خالی باشد")
        .isString().withMessage("عنوان باید از نوع رشته باشد"),

    body("description")
        .trim()
        .notEmpty().withMessage("توضیحات نمی‌تواند خالی باشد")
        .isString().withMessage("توضیحات باید از نوع رشته باشد"),

    body("expired_at")
        .trim()
        .notEmpty().withMessage("تاریخ انقضا نمی‌تواند خالی باشد")
        .isString().withMessage("تاریخ انقضا باید از نوع رشته باشد"),
];

export const updateNotificationValidate = [
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

    body("title")
        .trim()
        .optional()
        .notEmpty().withMessage("عنوان نمی‌تواند خالی باشد")
        .isString().withMessage("عنوان باید از نوع رشته باشد"),

    body("description")
        .trim()
        .optional()
        .notEmpty().withMessage("توضیحات نمی‌تواند خالی باشد")
        .isString().withMessage("توضیحات باید از نوع رشته باشد"),

    body("expired_at")
        .trim()
        .optional()
        .notEmpty().withMessage("تاریخ انقضا نمی‌تواند خالی باشد")
        .isString().withMessage("تاریخ انقضا باید از نوع رشته باشد"),

];