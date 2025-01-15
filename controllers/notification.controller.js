import db from '../models/index.js';

export const index = async (req,res)=>{
    const {limit} = req.query;
    try {
       if (!limit) {
           const notifications = await db.Notification.findAll();
           return res.status(200).json(notifications)
       }
        const notifications = await db.Notification.findAll({limit:limit});
        return res.status(200).json(notifications)

    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const create = async (req,res)=>{
    try {
        const notification = await db.Notification.create(req.body)
        return res.status(200).json(notification)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}


export const update = async (req,res)=>{
    const {notification_id} = req.params
    try{
        const notification = await db.Notification.findByPk(notification_id)

        if(!notification){
            return res.status(404).json({error: 'اطلاعیه ای یافت نشد'})
        }
        await notification.update(req.body)
        return res.status(200).json(notification)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}


export const destroy = async (req,res)=>{
    const {notification_id} = req.params
    try{
        const notification = await db.Notification.findByPk(notification_id)

        if(!notification){
            return res.status(404).json({error: 'اطلاعیه ای یافت نشد'})
        }
        await notification.destroy()
        return res.status(200).json({msg:'اطلاعیه با موفقیت پاک شد'})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}