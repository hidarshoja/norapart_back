import db from "../models/index.js";
import {createOrders, getAllOrders} from "../services/order.services.js";

// ! get all orders
export const index = async(req,res)=>{
    try{
       const totalPrices = await getAllOrders(db)

        return res.status(200).json(totalPrices)
    }catch (e) {
        console.log(e)
    }
}

// ! create new order
export const create = async(req,res)=>{
   try{
       await createOrders(db,req.body)

       return res.status(201).json({message: 'سفارش شما ثبت شد'})

   }catch (e) {
       console.log(e)
   }
}

// ! add ref code
export const update = async(req,res) =>{
    try {
        await db.Address.update(
            {ref_code: req.body.ref_code,statuse: 'ارسال شد'},
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