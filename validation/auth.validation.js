import { body } from "express-validator"

export const validateSignup = [
  body("first_name")
    .trim()
    .notEmpty().withMessage("نام نمی‌تواند خالی باشد")
    .isString().withMessage("نام باید از نوع رشته باشد"),

  body("last_name")
    .trim()
    .notEmpty().withMessage("نام خانوادگی نمی‌تواند خالی باشد")
    .isString().withMessage("نام خانوادگی باید از نوع رشته باشد"),

  body("email")
    .trim()
    .isEmail().withMessage("لطفا فرمت ایمیل را به درستی وارد کنید"),

  body("phone")
    .trim()
    .notEmpty().withMessage("شماره تلفن نمی‌تواند خالی باشد")
    .isLength({ min: 11, max: 11 }).withMessage("شماره تلفن باید 11 رقم باشد")
    .matches(/^[0-9]+$/).withMessage("شماره تلفن باید فقط شامل اعداد باشد"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 20 }).withMessage("رمز عبور باید بین 6 تا 20 کاراکتر باشد"),
];


export const validateLogin = [
  body("phone")
    .trim()
    .notEmpty().withMessage("شماره تلفن نمی‌تواند خالی باشد")
    .isLength({ min: 11, max: 11 }).withMessage("شماره تلفن باید 11 رقم باشد")
    .matches(/^[0-9]+$/).withMessage("شماره تلفن باید فقط شامل اعداد باشد"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 20 }).withMessage("رمز عبور باید بین 6 تا 20 کاراکتر باشد"),
];

