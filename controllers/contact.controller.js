import db from "../models/index.js";
import {sendEmail} from '../libs/mails.js'
export const index = async(req, res) => {
    const {page=1 , limit=10} = req.query;
    const offset = (page - 1) * limit;
    try{
        const contact = await db.Contact.findAndCountAll({
            order:  [['createdAt','desc']],
            limit: parseInt(limit),
            offset: parseInt(offset),
        })
        return res.status(200).json({
            contact: contact.rows, // Fetched contact
            totalCount: contact.count, // Total number of contact
            totalPages: Math.ceil(contact.count / parseInt(limit)), // Total pages based on limit
            currentPage: parseInt(page), // Current page
            limit: parseInt(limit), // Items per page
        });

    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const create = async(req, res) => {
    try {
        const contacts = await db.Contact.create(req.body)

        return res.status(201).json({message: 'پیام شما با موفقیت ارسال شد',contacts})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }

}

export const update = async(req, res) => {
    try{
        const {contact_id} = req.params;
        const contact = await db.Contact.findByPk(contact_id)

        if (!contact) {
            return res.status(404).json({message: 'پیام مورد نظر یافت نشد'})
        }

        await contact.update({status : 'awnsered' , reply:req.body.reply})
        sendEmail(contact.email,req.body.reply)

        return res.status(200).json({message: 'پیام با موفقیت ارسال شد',contact})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

