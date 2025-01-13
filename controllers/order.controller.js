import db from "../models/index.js";
import {createOrders, getAllOrders, showOrderById} from "../services/order.service.js";
import axios from "axios";

// ! get all orders
export const index = async(req,res)=> {
    try{
       const totalPrices = await getAllOrders(db);

        return res.status(200).json(totalPrices)
    }catch (e) {
        console.log(e)
    }
}

// ! show user's orders
export const show = async(req,res)=> {

    try {
        const orders = await showOrderById(db,req.params);
        return res.status(200).json(orders)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error:e})
    }
}

// ! create new order
export const create = async(req,res)=>{
   try{

      const address_id = await createOrders(db,req.body)

       return res.status(201).json({message: 'سفارش شما ثبت شد',address_id})

   }catch (e) {
       console.log(e)
   }
}

// ! add ref code
export const update = async(req,res) =>{
    try {
        await db.Address.update(
            {ref_code: req.body.ref_code,statuse: req.body.status},
            {
                where:{
                    id:req.params.address_id
                }
            }
        )
        return res.status(200).json({message: 'کد سفارش با موفقیت ثبت گردید'})
    }catch (e) {
        console.log(e)
    }
}

//! add payment
export const payment = async(req,res) =>{
    try{
        const {amount} = req.body
        const merchant_id = await db.Option.findOne({where: { key: 'merchant_id'}})
        const callback_url = await db.Option.findOne({where: { key: 'callback_url'}})

        const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json', {
            merchant_id: merchant_id.value,
            amount: Number(amount) * 10,
            callback_url: callback_url.value,
            description: "درگاه پرداخت برای واریز وجه وبسایت نوراپارت"
        });

        const { code, authority } = response.data.data

        if (code === 100) {
            console.log('in code',authority)
            return res.status(200).json({ redirect_url: `https://zarinpal.com/pg/StartPay/${authority}` });
        }


    }catch (e) {
        console.log(e)
    }
}

export const verify = async(req,res) =>{
    const { authority,amount,user_id,address_id } = req.body
    try {
        const merchant_id = await db.Option.findOne({where: { key: 'merchant_id'}})
        const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/verify.json', {
            merchant_id: merchant_id.value,
            authority,
            amount,
            description: "اعتبار سازی مبلغ"
        });
        const {card_pan, ref_id,fee} = response.data.data
        console.log('verify',response.data.data)
        await db.Payment.create({
            user_id,
            address_id,
            card_pan,
            ref_id,
            fee,
            amount:Number(amount) * 10,
            authority
        })
        // TODO send sms to admin
        return res.status(200).json({msg: 'پرداخت با موفقیت انجام شد'})
    }catch (e) {
        console.log(e)
    }
}