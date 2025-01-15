import { body, query } from "express-validator";

export const createOrdersValidation = [
    body("formData.province_id")
        .trim()
        .notEmpty()
        .withMessage(" استان را وارد کنید")
        .isNumeric()
        .withMessage("استان را به عدد وارد کنید"),

    body("formData.city_id")
        .trim()
        .notEmpty()
        .withMessage("شهر را وارد کنید.")
        .isNumeric()
        .withMessage("شهر به صورت عدد است"),



    body("formData.address")
        .notEmpty()
        .withMessage("آدرس خود را وارد کنید")
        .isString()
        .withMessage("آدرس رو به صورت حروف وارد کنید"),


];

export const refUpdateOrderValidation = [
    body("ref_code")
        .trim()
        .notEmpty()
        .withMessage('کد رهگیری را وارد کنید')
        .matches(/^[0-9]+$/).withMessage("کد رهگیری باید فقط شامل اعداد باشد"),
]
