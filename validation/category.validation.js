import { body, query } from "express-validator";

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام دسته را وارد کنید")
    .isString()
    .withMessage("نام دسته را به حروف وارد کنید"),


  body("image_url")
    .notEmpty()
    .withMessage("عکس دسته بندی را وارد نمایید")
];

export const updateCategoryValidation = [
  body("name")
      .trim()
      .notEmpty()
      .withMessage("نام دسته را وارد کنید")
      .isString()
      .withMessage("نام دسته را به حروف وارد کنید"),
];