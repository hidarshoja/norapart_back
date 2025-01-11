import { body, query } from "express-validator";

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام محصول را وارد کنید")
    .isString()
    .withMessage("نام محصول را به عدد وارد کنید"),
    
  body("price")
    .trim()
    .notEmpty()
    .withMessage("قیمت محصول را وارد کنید.")
    .isNumeric()
    .withMessage("قیمت محصول به صورت عدد است"),

  body("description")
      .trim()
      .notEmpty()
      .withMessage("توضیحات محصول را وارد کنید.")
      .isString()
      .withMessage("توضیحات محصول به صورت فارسی است"),

  body("amount")
      .trim()
      .notEmpty()
      .withMessage("موجودی محصول را وارد کنید.")
      .isNumeric()
      .withMessage("موجودی محصول به صورت عدد است"),


  body("category_id")
    .notEmpty()
    .withMessage("دسته بندی محصول را انتخاب کنید")
    .isNumeric()
    .withMessage("دسته بندی محصول به صورت عدد است."),

  body("machine")
    .trim()
    .notEmpty()
    .withMessage("نوع خودرو را وارد کنید")
    .isString()
    .withMessage("نوع خودرو بایستی حروف باشد"),

    body("category_id")
    .trim()
    .notEmpty()
    .withMessage("نوع خودرو را وارد کنید")
    .isString()
    .withMessage("نوع خودرو بایستی حروف باشد"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("برند محصول را وارد کنید")
    .isString()
    .withMessage("برند محصول از نوع عددی نیست"),

  body("material")
    .trim()
    .notEmpty()
    .withMessage("جنس محصول را وارد کنید")
    .isString()
    .withMessage("جنس محصول از نوع عددی نیست."),

  body("images")
    .isArray()
    .withMessage("عکس محصول از جنس آرایه است")
    .isLength({ min: 1 })
    .withMessage("حداقل یک عکس را وارد کنید"),

  query('page').optional().isInt({ min: 1 }).withMessage('صفحات عددی مثبت است'),
  query('limit').optional().isInt({ min: 1 }).withMessage('تعداد صفحات عددی مثبت است'),
];

export const updateProductValidation = [
  body("name")
      .trim()
      .notEmpty()
      .withMessage("نام محصول را وارد کنید")
      .isString()
      .withMessage("نام محصول را به عدد وارد کنید"),

  body("price")
      .trim()
      .notEmpty()
      .withMessage("قیمت محصول را وارد کنید.")
      .isNumeric()
      .withMessage("قیمت محصول به صورت عدد است"),
    
  body("description")
      .trim()
      .notEmpty()
      .withMessage("توضیحات محصول را وارد کنید.")
      .isString()
      .withMessage("توضیحات محصول به صورت فارسی است"),

  body("amount")
      .trim()
      .notEmpty()
      .withMessage("موجودی محصول را وارد کنید.")
      .isNumeric()
      .withMessage("موجودی محصول به صورت عدد است"),

  body("category_id")
      .notEmpty()
      .withMessage("دسته بندی محصول را انتخاب کنید")
      .isNumeric()
      .withMessage("دسته بندی محصول به صورت عدد است."),

  body("machine")
      .trim()
      .notEmpty()
      .withMessage("نوع خودرو را وارد کنید")
      .isString()
      .withMessage("نوع خودرو بایستی حروف باشد"),

  body("category_id")
      .trim()
      .notEmpty()
      .withMessage("نوع خودرو را وارد کنید")
      .isString()
      .withMessage("نوع خودرو بایستی حروف باشد"),

  body("brand")
      .trim()
      .notEmpty()
      .withMessage("برند محصول را وارد کنید")
      .isString()
      .withMessage("برند محصول از نوع عددی نیست"),

  body("material")
      .trim()
      .notEmpty()
      .withMessage("جنس محصول را وارد کنید")
      .isString()
      .withMessage("جنس محصول از نوع عددی نیست."),
];


export const offerValidation = [
    body('products')
        .isArray()
        .withMessage('محصولات باید به صورت آرایه باشد')
        .isLength({ min: 1 })
        .withMessage('محصولات نباید خالی باشد')
]
