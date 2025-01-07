import {body} from "express-validator";
const allowedFields = ["username", "body","blog_id"];
const allowedFieldsReply = ["body","comment_id"];
export const commentVaalidtion = [
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
        .notEmpty()
        .withMessage("موضوع سوال  را وارد کنید")
        .isString()
        .withMessage("موضوع سوال را به فارسی وارد کنید"),

    body("body")
        .trim()
        .notEmpty()
        .withMessage("کامنت  را وارد کنید.")
        .isString()
        .withMessage("کامنت به صورت فارسی است"),
];


export const replyCommentValidation = [
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

    body("body")
        .trim()
        .notEmpty()
        .withMessage("جواب کامنت  را وارد کنید.")
        .isString()
        .withMessage("موضوع کامنت به صورت فارسی است"),
];