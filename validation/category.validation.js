import { body, query } from "express-validator";

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام محصول را وارد کنید")
    .isString()
    .withMessage("نام محصول را به عدد وارد کنید"),


  body("image_url")
    .notEmpty()
    .withMessage("عکس دسته بندی را وارد نمایید")
];