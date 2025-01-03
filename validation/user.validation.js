import {body} from "express-validator";

//! Define the allowed fields
const allowedFields = ["first_name", "last_name", "email", "phone"];

export const updateUserValidation = [
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

    body("first_name")
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("نام نمی‌تواند خالی باشد")
        .isString().withMessage("نام باید از نوع رشته باشد"),

    body("last_name")
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("نام خانوادگی نمی‌تواند خالی باشد")
        .isString().withMessage("نام خانوادگی باید از نوع رشته باشد"),

    body("email")
        .optional() // Makes the field optional
        .trim()
        .isEmail().withMessage("لطفا فرمت ایمیل را به درستی وارد کنید"),

    body("phone")
        .optional() // Makes the field optional
        .trim()
        .notEmpty().withMessage("شماره تلفن نمی‌تواند خالی باشد")
        .isLength({ min: 11, max: 11 }).withMessage("شماره تلفن باید 11 رقم باشد")
        .matches(/^[0-9]+$/).withMessage("شماره تلفن باید فقط شامل اعداد باشد"),
];


export const changePasswordValidation = [
    body("password")
        .trim()
        .isLength({ min: 6, max: 20 }).withMessage("رمز عبور باید بین 6 تا 20 کاراکتر باشد"),
]