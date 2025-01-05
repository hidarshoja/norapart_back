import {body} from "express-validator";

//! Define the allowed fields
const allowedFields = ["name", "body",  "category","body"];

export const addBlogValidation = [
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
        .notEmpty().withMessage("نام نمی‌تواند خالی باشد")
        .isString().withMessage("نام باید از نوع رشته باشد"),

    body("body")
        .trim()
        .notEmpty().withMessage("توضیحات نمی‌تواند خالی باشد")
        .isString().withMessage("توضیحات باید از نوع رشته باشد"),


    body("image_url")
        .trim()
        .notEmpty().withMessage("عکس نمی‌تواند خالی باشد")
        .isString().withMessage("عکس باید از نوع رشته باشد"),

    body("category")
        .trim()
        .notEmpty().withMessage("دسته بندی نمی‌تواند خالی باشد")
        .isString().withMessage("دسته بندی باید از نوع رشته باشد"),
];

export const updateBlogValidation = [
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
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("نام نمی‌تواند خالی باشد")
        .isString().withMessage("نام باید از نوع رشته باشد"),

    body("body")
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("توضیحات نمی‌تواند خالی باشد")
        .isString().withMessage("توضیحات باید از نوع رشته باشد"),


    body("image_url")
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("عکس نمی‌تواند خالی باشد")
        .isString().withMessage("عکس باید از نوع رشته باشد"),

    body("category")
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("دسته بندی نمی‌تواند خالی باشد")
        .isString().withMessage("دسته بندی باید از نوع رشته باشد"),
];